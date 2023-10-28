package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final TransactionRepo transactionRepo;
    private final CategoryRepo categoryRepo;
    private final BudgetMappingService budgetMappingService;


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

    public TransactionCategory addTransactionCategory(NewCategory newCategory) {
        TransactionCategory transactionCategory = budgetMappingService.mapNewCategoryToTransactionCategory(newCategory);
        return categoryRepo.save(transactionCategory);
    }

    public void deleteTransactionEntry(String id) {

        transactionRepo.deleteById(id);
    }

    public void deleteCategory(String id) {
        categoryRepo.deleteById(id);
    }
}
