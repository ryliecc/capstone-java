package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.categories.CategoryResponse;
import com.github.ryliecc.backend.models.categories.NewCategory;
import com.github.ryliecc.backend.models.categories.TransactionCategory;
import com.github.ryliecc.backend.models.categories.UpdatedCategory;
import com.github.ryliecc.backend.models.transaction.daily.NewTransaction;
import com.github.ryliecc.backend.models.transaction.daily.TransactionEntry;
import com.github.ryliecc.backend.models.transaction.daily.TransactionsResponse;
import com.github.ryliecc.backend.models.transaction.daily.UpdatedTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyRecurringTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyTransactionResponse;
import com.github.ryliecc.backend.models.transaction.monthly.NewMonthlyTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.UpdatedMonthlyTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final TransactionRepo transactionRepo;
    private final CategoryRepo categoryRepo;
    private final MonthlyRecurringTransactionRepo recurringTransactionRepo;
    private final BudgetMappingService budgetMappingService;

    private final Instant currentInstant = LocalDate.now().plusDays(1).atStartOfDay(ZoneOffset.UTC).toInstant();

    public String calculateDailyBudget(String creatorId) {
        YearMonth currentYearMonth = YearMonth.now();
        int totalDaysInMonth = currentYearMonth.lengthOfMonth();
        int remainingDaysInMonth = totalDaysInMonth - LocalDate.now().getDayOfMonth() + 1;

        List<TransactionEntry> transactions = transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()) &&
                        !transaction.getTimeLogged().isAfter(currentInstant))
                .toList();

        BigDecimal totalAmount = transactions.stream()
                .map(transaction -> new BigDecimal(transaction.getAmountOfMoney()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal dailyBudget = totalAmount.divide(BigDecimal.valueOf(remainingDaysInMonth), 2, RoundingMode.HALF_UP);

        return dailyBudget.toString();
    }


    public List<TransactionsResponse> getTransactionsByCreatorId(String creatorId) {
        return transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .filter(transaction -> !transaction.getTimeLogged().isAfter(currentInstant))
                .map(budgetMappingService::mapTransactionToResponse)
                .toList();
    }

    public List<MonthlyTransactionResponse> getMonthlyTransactionsByCreatorId(String creatorId) {
        return recurringTransactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .map(budgetMappingService::mapRecurringTransactionToResponse)
                .toList();
    }

    public List<CategoryResponse> getCategoriesByCreatorId(String creatorId) {
        return categoryRepo.findAll()
                .stream()
                .filter(category -> creatorId.equals(category.getCreatorId()))
                .map(budgetMappingService::mapCategoryToResponse)
                .toList();
    }

    public String getSumOfAmountsByCreatorId(String creatorId) {

        List<TransactionEntry> transactions = transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .filter(transaction -> transaction.getTimeLogged().isBefore(currentInstant))
                .toList();

        BigDecimal totalAmount = transactions.stream()
                .map(transaction -> new BigDecimal(transaction.getAmountOfMoney()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal roundedTotalAmount = totalAmount.setScale(2, RoundingMode.HALF_UP);

        return roundedTotalAmount.toString();
    }


    public TransactionsResponse addTransactionEntry(NewTransaction newTransaction) {
        TransactionEntry transactionEntry = budgetMappingService.mapNewTransactionToTransactionEntry(newTransaction);
        TransactionEntry savedTransaction = transactionRepo.save(transactionEntry);
        return budgetMappingService.mapTransactionToResponse(savedTransaction);
    }

    public MonthlyTransactionResponse addMonthlyTransaction(NewMonthlyTransaction newMonthlyTransaction) {
        MonthlyRecurringTransaction recurringTransaction = budgetMappingService.mapNewMonthlyTransactionToRecurringTransaction(newMonthlyTransaction);
        MonthlyRecurringTransaction savedRecurring = recurringTransactionRepo.save(recurringTransaction);
        List<TransactionEntry> allTransactions = budgetMappingService.mapNewMonthlyTransaction(savedRecurring);
        transactionRepo.saveAll(allTransactions);
        return budgetMappingService.mapRecurringTransactionToResponse(recurringTransaction);
    }

    public CategoryResponse addTransactionCategory(NewCategory newCategory) {
        TransactionCategory transactionCategory = budgetMappingService.mapNewCategoryToTransactionCategory(newCategory);
        TransactionCategory savedCategory = categoryRepo.save(transactionCategory);
        return budgetMappingService.mapCategoryToResponse(savedCategory);
    }

    public void deleteTransactionEntry(String id) {

        transactionRepo.deleteById(id);
    }

    public void deleteMonthlyTransaction(String id) {
        recurringTransactionRepo.deleteById(id);

        List<TransactionEntry> futureEntries = transactionRepo.findAll()
                .stream()
                .filter(entry -> id.equals(entry.getReferenceId()))
                .filter(entry -> entry.getTimeLogged().isAfter(currentInstant))
                .toList();


        transactionRepo.deleteAll(futureEntries);
    }

    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }

    public TransactionsResponse updateTransactionEntry(UpdatedTransaction updatedTransaction) {
        String timeLoggedString = updatedTransaction.getTimeLogged();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")
                .withZone(ZoneOffset.UTC);

        TransactionEntry transactionEntry = transactionRepo.findById(updatedTransaction.getId()).orElseThrow();
        transactionEntry.setTitle(updatedTransaction.getTitle());
        transactionEntry.setTimeLogged(Instant.from(formatter.parse(timeLoggedString)));
        transactionEntry.setAmountOfMoney(updatedTransaction.getAmountOfMoney());
        transactionEntry.setTransactionCategory(updatedTransaction.getTransactionCategory());
        transactionEntry.setReferenceId(updatedTransaction.getReferenceId());

        transactionRepo.save(transactionEntry);

        return budgetMappingService.mapTransactionToResponse(transactionEntry);
    }

    public MonthlyTransactionResponse updateMonthlyTransaction(UpdatedMonthlyTransaction updatedTransaction) {
        String startDateString = updatedTransaction.getStartDate();
        String endDateString = updatedTransaction.getEndDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm")
                .withZone(ZoneOffset.UTC);
        Instant startDateInstant = Instant.from(formatter.parse(startDateString));
        Instant endDateInstant = Instant.from(formatter.parse(endDateString));

        MonthlyRecurringTransaction existingEntry = recurringTransactionRepo.findById(updatedTransaction.getId()).orElseThrow();
        List<TransactionEntry> correspondingTransactions = transactionRepo.findAll()
                .stream()
                .filter(transaction -> transaction.getReferenceId().equals(updatedTransaction.getId()))
                .toList();

        for (TransactionEntry correspondingTransaction : correspondingTransactions) {
            transactionRepo.deleteById(correspondingTransaction.getId());
        }

        existingEntry.setTitle(updatedTransaction.getTitle());
        existingEntry.setStartDate(startDateInstant);
        existingEntry.setEndDate(endDateInstant);
        existingEntry.setTransactionCategory(updatedTransaction.getTransactionCategory());
        existingEntry.setAmountOfMoney(updatedTransaction.getAmountOfMoney());

        List<TransactionEntry> newTransactionEntries = budgetMappingService.mapNewMonthlyTransaction(existingEntry);
        transactionRepo.saveAll(newTransactionEntries);
        recurringTransactionRepo.save(existingEntry);
        return budgetMappingService.mapRecurringTransactionToResponse(existingEntry);
    }

    public CategoryResponse updateCategory(UpdatedCategory updatedCategory) {
        TransactionCategory category = categoryRepo.findById(updatedCategory.getId()).orElseThrow();
        category.setTitle(updatedCategory.getTitle());
        category.setCategoryType(updatedCategory.getCategoryType());

        categoryRepo.save(category);
        return budgetMappingService.mapCategoryToResponse(category);
    }
}
