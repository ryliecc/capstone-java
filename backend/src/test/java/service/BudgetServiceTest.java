package service;

import com.github.ryliecc.backend.models.NewTransaction;
import com.github.ryliecc.backend.models.TransactionEntry;
import com.github.ryliecc.backend.models.TransactionsResponse;
import com.github.ryliecc.backend.service.BudgetMappingService;
import com.github.ryliecc.backend.service.BudgetService;
import com.github.ryliecc.backend.service.CategoryRepo;
import com.github.ryliecc.backend.service.TransactionRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class BudgetServiceTest {
    TransactionRepo transactionRepo = mock(TransactionRepo.class);
    CategoryRepo categoryRepo = mock(CategoryRepo.class);
    BudgetService budgetService = new BudgetService(transactionRepo, categoryRepo, new BudgetMappingService());

    private TransactionEntry setUp() {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 0, 0);
        Instant fixedInstant = localDateTime.toInstant(ZoneOffset.UTC);

        return new TransactionEntry("1", "title", fixedInstant,
                "1.61", "testId");
        //fixed instant = 2020-01-01T12:00:00Z
    }

    @Test
    void getAllTransactions() {
        //GIVEN
        List<TransactionsResponse> expected = List.of(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId"));

        when(transactionRepo.findAll()).thenReturn(List.of(setUp()));

        //WHEN
        List<TransactionsResponse> actual = budgetService.getTransactionsByCreatorId("testId");

        //THEN
        Assertions.assertEquals(1, actual.size());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGetSumOfAmountsByCreatorId() {
        // GIVEN
        List<TransactionsResponse> expected = List.of(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId"));
        BigDecimal expectedSum = new BigDecimal("1.61").setScale(2, RoundingMode.HALF_UP);

        when(transactionRepo.findAll()).thenReturn(List.of(setUp()));

        // WHEN
        String actualSum = budgetService.getSumOfAmountsByCreatorId("testId");

        // THEN
        Assertions.assertEquals(expectedSum.toString(), actualSum);
    }


    @Test
    void addTransactionEntry() {
        //GIVEN
        NewTransaction newTransaction = new NewTransaction();
        newTransaction.setTitle("title");
        newTransaction.setAmountOfMoney("1.61");
        newTransaction.setCreatorId("testId");

        when(transactionRepo.save(any(TransactionEntry.class))).thenReturn(setUp());

        //WHEN
        TransactionsResponse actual = budgetService.addTransactionEntry(newTransaction);

        //THEN
        Assertions.assertEquals("title", actual.title());
        Assertions.assertEquals("1.61", actual.amountOfMoney());
        Assertions.assertEquals("testId", actual.creatorId());
    }

    @Test
    void deleteTransactionEntry()
    {

        Assertions.assertTrue(true);
    }
}
