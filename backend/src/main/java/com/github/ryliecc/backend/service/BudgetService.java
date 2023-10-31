package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final TransactionRepo transactionRepo;
    private final CategoryRepo categoryRepo;
    private final MonthlyRecurringTransactionRepo recurringTransactionRepo;
    private final BudgetMappingService budgetMappingService;

    private boolean isTransactionInCurrentMonth(TransactionEntry transaction) {
        YearMonth currentYearMonth = YearMonth.now();
        YearMonth transactionYearMonth = YearMonth.from(transaction.getTimeLogged().atZone(ZoneId.systemDefault()));
        return currentYearMonth.equals(transactionYearMonth);
    }

    private boolean isRecurringTransactionInCurrentMonth(MonthlyRecurringTransaction transaction) {
        YearMonth currentYearMonth = YearMonth.now();
        YearMonth transactionYearMonth = YearMonth.from(transaction.getStartDate().atZone(ZoneId.systemDefault()));
        return currentYearMonth.equals(transactionYearMonth);
    }

    public String calculateDailyBudget(String creatorId) {
        List<TransactionsResponse> transactions = transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .filter(this::isTransactionInCurrentMonth)
                .map(budgetMappingService::mapTransactionToResponse)
                .toList();

        BigDecimal totalAmount = transactions.stream()
                .map(transaction -> new BigDecimal(transaction.amountOfMoney()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<MonthlyRecurringTransaction> recurringTransactions = recurringTransactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .filter(this::isRecurringTransactionInCurrentMonth)
                .toList();

        BigDecimal totalRecurringAmount = recurringTransactions.stream()
                .map(transaction -> new BigDecimal(transaction.getAmountOfMoney()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalAmountForCurrentMonth = totalAmount.add(totalRecurringAmount);

        YearMonth currentYearMonth = YearMonth.now();
        int numberOfDaysInMonth = currentYearMonth.lengthOfMonth();

        BigDecimal dailyBudget = totalAmountForCurrentMonth.divide(BigDecimal.valueOf(numberOfDaysInMonth), 2, RoundingMode.HALF_UP);

        return dailyBudget.toString();
    }

    public List<TransactionsResponse> getTransactionsByCreatorId(String creatorId) {
        return transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .map(budgetMappingService::mapTransactionToResponse)
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
        List<TransactionsResponse> transactions = transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .map(budgetMappingService::mapTransactionToResponse)
                .toList();

        BigDecimal totalAmount = transactions.stream()
                .map(transaction -> new BigDecimal(transaction.amountOfMoney()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal roundedTotalAmount = totalAmount.setScale(2, RoundingMode.HALF_UP);

        return roundedTotalAmount.toString();
    }



    public TransactionsResponse addTransactionEntry(NewTransaction newTransaction) {
        TransactionEntry transactionEntry = budgetMappingService.mapNewTransactionToTransactionEntry(newTransaction);
        TransactionEntry savedTransaction = transactionRepo.save(transactionEntry);
        return budgetMappingService.mapTransactionToResponse(savedTransaction);
    }

    public CategoryResponse addTransactionCategory(NewCategory newCategory) {
        TransactionCategory transactionCategory = budgetMappingService.mapNewCategoryToTransactionCategory(newCategory);
        TransactionCategory savedCategory = categoryRepo.save(transactionCategory);
        return budgetMappingService.mapCategoryToResponse(savedCategory);
    }

    public void deleteTransactionEntry(String id) {

        transactionRepo.deleteById(id);
    }

    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }
}
