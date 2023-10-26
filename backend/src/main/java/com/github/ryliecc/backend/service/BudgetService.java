package com.github.ryliecc.backend.service;

import lombok.RequiredArgsConstructor;
import com.github.ryliecc.backend.models.NewTransaction;
import com.github.ryliecc.backend.models.TransactionEntry;
import com.github.ryliecc.backend.models.TransactionsResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final TransactionRepo transactionRepo;
    private final BudgetMappingService budgetMappingService;


    public List<TransactionsResponse> getTransactionsByCreatorId(String creatorId) {
        return transactionRepo.findAll()
                .stream()
                .filter(transaction -> creatorId.equals(transaction.getCreatorId()))
                .map(budgetMappingService::mapTransactionToResponse)
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

    public void deleteTransactionEntry(String id) {

        transactionRepo.deleteById(id);
    }
}
