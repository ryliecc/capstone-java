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

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

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
                .referenceId(transactionEntry.getReferenceId())
                .build();
    }

    public MonthlyTransactionResponse mapRecurringTransactionToResponse(MonthlyRecurringTransaction recurringTransaction) {
        return MonthlyTransactionResponse.builder()
                .id(recurringTransaction.getId())
                .title(recurringTransaction.getTitle())
                .startDate(recurringTransaction.getStartDate().toString())
                .endDate(recurringTransaction.getEndDate().toString())
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
                .referenceId("daily_transaction")
                .build();
    }

    public MonthlyRecurringTransaction mapNewMonthlyTransactionToRecurringTransaction(NewMonthlyTransaction newMonthlyTransaction) {
        String startDateTimeString = newMonthlyTransaction.getStartDate();
        String endDateTimeString = newMonthlyTransaction.getEndDate();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        LocalDateTime startLocalTime = LocalDateTime.parse(startDateTimeString, formatter);
        ZonedDateTime startZonedTime = startLocalTime.atZone(ZoneId.systemDefault());


        Instant startDateInstant = startZonedTime.toInstant();
        Instant endDateInstant;

        if ("not set".equals(endDateTimeString)) {
            endDateInstant = startDateInstant.atZone(ZoneId.systemDefault()).plusYears(5).toInstant();
        } else {
            LocalDateTime endLocalTime = LocalDateTime.parse(endDateTimeString, formatter);
            ZonedDateTime endZonedTime = endLocalTime.atZone(ZoneId.systemDefault());
            endDateInstant = endZonedTime.toInstant();
        }

        return MonthlyRecurringTransaction.builder()
                .title(newMonthlyTransaction.getTitle())
                .startDate(startDateInstant)
                .endDate(endDateInstant)
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

    public List<TransactionEntry> mapNewMonthlyTransaction(MonthlyRecurringTransaction newTransaction) {
        List<TransactionEntry> transactionEntries = new ArrayList<>();

        Instant startDateInstant = newTransaction.getStartDate();
        Instant endDateInstant = newTransaction.getEndDate();

        ZoneId zoneId = ZoneId.systemDefault();

        LocalDate startDate = startDateInstant.atZone(zoneId).toLocalDate();
        LocalDate endDate = endDateInstant.atZone(zoneId).toLocalDate();

        while (!startDate.isAfter(endDate)) {
            TransactionEntry entry = new TransactionEntry();
            entry.setTitle(newTransaction.getTitle());
            entry.setTimeLogged(startDate.atStartOfDay(zoneId).toInstant());
            entry.setAmountOfMoney(newTransaction.getAmountOfMoney());
            entry.setCreatorId(newTransaction.getCreatorId());
            entry.setTransactionCategory(newTransaction.getTransactionCategory());
            entry.setReferenceId(newTransaction.getId());

            transactionEntries.add(entry);

            startDate = startDate.plusMonths(1);
        }

        return transactionEntries;
    }

}
