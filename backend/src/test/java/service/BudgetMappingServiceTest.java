package service;

import models.NewTransaction;
import models.TransactionEntry;
import models.TransactionsResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;

class BudgetMappingServiceTest {
    private final BudgetMappingService budgetMappingService = new BudgetMappingService();

    @Test
    void mapTransactionToResponse() {
        // GIVEN
        TransactionEntry transactionEntry = new TransactionEntry();
        transactionEntry.setId("id");
        transactionEntry.setTitle("title");
        transactionEntry.setTimeLogged(Instant.now());
        transactionEntry.setAmountOfMoney("13.12");

        // WHEN
        TransactionsResponse actual = budgetMappingService.mapTransactionToResponse(transactionEntry);

        // THEN
        Assertions.assertEquals("id", actual.id());
        assert actual.title().equals("title");
        assert actual.amountOfMoney().equals("13.12");
        assert actual.timeLogged() != null;

    }

    @Test
    void mapNewTransactionToTransactionEntry() {
        // GIVEN
        NewTransaction newTransaction = new NewTransaction();
        newTransaction.setTitle("title");
        newTransaction.setAmountOfMoney("4.20");

        // WHEN
        TransactionEntry actual = budgetMappingService.mapNewTransactionToTransactionEntry(newTransaction);

        // THEN
        Assertions.assertEquals("title", actual.getTitle());
        assert actual.getAmountOfMoney().equals("4.20");
        assert actual.getTimeLogged() != null;
    }
}
