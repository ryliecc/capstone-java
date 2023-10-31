package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.categories.CategoryResponse;
import com.github.ryliecc.backend.models.categories.NewCategory;
import com.github.ryliecc.backend.models.categories.TransactionCategory;
import com.github.ryliecc.backend.models.transaction.daily.NewTransaction;
import com.github.ryliecc.backend.models.transaction.daily.TransactionEntry;
import com.github.ryliecc.backend.models.transaction.daily.TransactionsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

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

    public TransactionCategory mapNewCategoryToTransactionCategory(NewCategory newCategory) {
        return TransactionCategory.builder()
                .title(newCategory.getTitle())
                .creatorId(newCategory.getCreatorId())
                .categoryType(newCategory.getCategoryType())
                .build();
    }

}
