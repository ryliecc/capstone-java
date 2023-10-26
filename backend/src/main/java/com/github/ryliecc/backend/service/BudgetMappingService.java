package com.github.ryliecc.backend.service;

import lombok.RequiredArgsConstructor;
import com.github.ryliecc.backend.models.NewTransaction;
import com.github.ryliecc.backend.models.TransactionEntry;
import com.github.ryliecc.backend.models.TransactionsResponse;
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
                .build();
    }

    public TransactionEntry mapNewTransactionToTransactionEntry(NewTransaction newTransaction){
        return TransactionEntry.builder()
                .title(newTransaction.getTitle())
                .amountOfMoney(newTransaction.getAmountOfMoney())
                .timeLogged(Instant.now())
                .creatorId(newTransaction.getCreatorId())
                .build();
    }
}
