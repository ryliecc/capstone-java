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

import java.time.Instant;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class BudgetMappingService {

    public TransactionsResponse mapTransactionToResponse(TransactionEntry transactionEntry) {
        return TransactionsResponse.builder()
                .id(transactionEntry.getId())
                .title(transactionEntry.getTitle())
                .timeLogged(transactionEntry.getTimeLogged().toString())
                .amountOfMoney(transactionEntry.getAmountOfMoney())
                .creatorId(transactionEntry.getCreatorId())
                .transactionCategory(transactionEntry.getTransactionCategory())
                .build();
    }

    public MonthlyTransactionResponse mapRecurringTransactionToResponse(MonthlyRecurringTransaction recurringTransaction) {
        return MonthlyTransactionResponse.builder()
                .id(recurringTransaction.getId())
                .title(recurringTransaction.getTitle())
                .startDate(recurringTransaction.getStartDate().toString())
                .amountOfMoney(recurringTransaction.getAmountOfMoney())
                .creatorId(recurringTransaction.getCreatorId())
                .transactionCategory(recurringTransaction.getTransactionCategory())
                .build();

    }

    public CategoryResponse mapCategoryToResponse(TransactionCategory transactionCategory) {
        return CategoryResponse.builder()
                .id(transactionCategory.getId())
                .title(transactionCategory.getTitle())
                .creatorId(transactionCategory.getCreatorId())
                .categoryType(transactionCategory.getCategoryType())
                .build();
    }

    public TransactionEntry mapNewTransactionToTransactionEntry(NewTransaction newTransaction){
        return TransactionEntry.builder()
                .title(newTransaction.getTitle())
                .amountOfMoney(newTransaction.getAmountOfMoney())
                .timeLogged(Instant.now())
                .creatorId(newTransaction.getCreatorId())
                .transactionCategory(newTransaction.getTransactionCategory())
                .build();
    }

    public MonthlyRecurringTransaction mapNewMonthlyTransactionToRecurringTransaction(NewMonthlyTransaction newMonthlyTransaction) {
        String dateTimeString = newMonthlyTransaction.getStartDate();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
        Instant instant = Instant.from(formatter.parse(dateTimeString));
        return MonthlyRecurringTransaction.builder()
                .title(newMonthlyTransaction.getTitle())
                .startDate(instant)
                .amountOfMoney(newMonthlyTransaction.getAmountOfMoney())
                .creatorId(newMonthlyTransaction.getCreatorId())
                .transactionCategory(newMonthlyTransaction.getTransactionCategory())
                .build();
    }

    public TransactionCategory mapNewCategoryToTransactionCategory(NewCategory newCategory) {
        return TransactionCategory.builder()
                .title(newCategory.getTitle())
                .creatorId(newCategory.getCreatorId())
                .categoryType(newCategory.getCategoryType())
                .build();
    }

}
