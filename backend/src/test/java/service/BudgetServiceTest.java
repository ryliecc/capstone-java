package service;

import com.github.ryliecc.backend.models.NewTransaction;
import com.github.ryliecc.backend.models.TransactionEntry;
import com.github.ryliecc.backend.models.TransactionsResponse;
import com.github.ryliecc.backend.service.BudgetMappingService;
import com.github.ryliecc.backend.service.BudgetService;
import com.github.ryliecc.backend.service.TransactionRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BudgetServiceTest {
    TransactionRepo transactionRepo = mock(TransactionRepo.class);
    BudgetService budgetService = new BudgetService(transactionRepo, new BudgetMappingService());

    private TransactionEntry setUp() {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 0, 0);
        Instant fixedInstant = localDateTime.toInstant(ZoneOffset.UTC);

        return new TransactionEntry("1", "title", fixedInstant,
                "1.61");
        //fixed instant = 2020-01-01T12:00:00Z
    }

    @Test
    void getAllTransactions() {
        //GIVEN
        List<TransactionsResponse> expected = List.of(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61"));

        when(transactionRepo.findAll()).thenReturn(List.of(setUp()));

        //WHEN
        List<TransactionsResponse> actual = budgetService.getAllTransactions();

        //THEN
        Assertions.assertEquals(1, actual.size());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void addTransactionEntry() {
        //GIVEN
        NewTransaction newTransaction = new NewTransaction();
        newTransaction.setTitle("title");
        newTransaction.setAmountOfMoney("1.61");

        when(transactionRepo.save(any(TransactionEntry.class))).thenReturn(setUp());

        //WHEN
        TransactionsResponse actual = budgetService.addTransactionEntry(newTransaction);

        //THEN
        Assertions.assertEquals("title", actual.title());
        Assertions.assertEquals("1.61", actual.amountOfMoney());
    }
}
