package service;

import lombok.RequiredArgsConstructor;
import models.NewTransaction;
import models.TransactionEntry;
import models.TransactionsResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final TransactionRepo transactionRepo;
    private final BudgetMappingService budgetMappingService;

    public List<TransactionsResponse> getAllTransactions() {
        return transactionRepo.findAll().stream().map(budgetMappingService::mapTransactionToResponse).toList();
    }

    public TransactionsResponse addTransactionEntry(NewTransaction newTransaction) {
        TransactionEntry transactionEntry = budgetMappingService.mapNewTransactionToTransactionEntry(newTransaction);
        return budgetMappingService.mapTransactionToResponse(transactionEntry);
    }
}
