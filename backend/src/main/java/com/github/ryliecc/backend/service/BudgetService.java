package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.categories.CategoryResponse;
import com.github.ryliecc.backend.models.categories.NewCategory;
import com.github.ryliecc.backend.models.categories.TransactionCategory;
import com.github.ryliecc.backend.models.transaction.daily.NewTransaction;
import com.github.ryliecc.backend.models.transaction.daily.TransactionEntry;
import com.github.ryliecc.backend.models.transaction.daily.TransactionsResponse;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyRecurringTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyTransactionResponse;
import com.github.ryliecc.backend.models.transaction.monthly.NewMonthlyTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;
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
}
