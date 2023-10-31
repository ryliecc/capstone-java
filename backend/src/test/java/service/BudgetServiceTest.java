package service;

import com.github.ryliecc.backend.models.*;
import com.github.ryliecc.backend.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BudgetServiceTest {
    TransactionRepo transactionRepo = mock(TransactionRepo.class);
    CategoryRepo categoryRepo = mock(CategoryRepo.class);

    MonthlyRecurringTransactionRepo recurringTransactionRepo = mock(MonthlyRecurringTransactionRepo.class);
    BudgetService budgetService = new BudgetService(transactionRepo, categoryRepo, recurringTransactionRepo, new BudgetMappingService());

    private TransactionEntry setUpTransaction() {
        LocalDateTime localDateTime = LocalDateTime.of(2020, 1, 1, 12, 0, 0);
        Instant fixedInstant = localDateTime.toInstant(ZoneOffset.UTC);

        return new TransactionEntry("1", "title", fixedInstant, "1.61", "testId", "category");
    }

    private TransactionCategory setUpCategory() {
        return new TransactionCategory("1", "title", "testId", "expense");
    }




    @Test
    void getAllTransactions() {
        //GIVEN
        List<TransactionsResponse> expected = List.of(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId", "category"));

        when(transactionRepo.findAll()).thenReturn(List.of(setUpTransaction()));

        //WHEN
        List<TransactionsResponse> actual = budgetService.getTransactionsByCreatorId("testId");

        //THEN
        Assertions.assertEquals(1, actual.size());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getAllCategories() {
        //GIVEN
        List<CategoryResponse> expected = List.of(new CategoryResponse("1", "title", "testId", "expense"));

        when(categoryRepo.findAll()).thenReturn(List.of(setUpCategory()));

        //WHEN
        List<CategoryResponse> actual = budgetService.getCategoriesByCreatorId("testId");

        //THEN
        Assertions.assertEquals(1, actual.size());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testGetSumOfAmountsByCreatorId() {
        // GIVEN
        BigDecimal expectedSum = new BigDecimal("1.61").setScale(2, RoundingMode.HALF_UP);

        when(transactionRepo.findAll()).thenReturn(List.of(setUpTransaction()));

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

        when(transactionRepo.save(any(TransactionEntry.class))).thenReturn(setUpTransaction());

        //WHEN
        TransactionsResponse actual = budgetService.addTransactionEntry(newTransaction);

        //THEN
        Assertions.assertEquals("title", actual.title());
        Assertions.assertEquals("1.61", actual.amountOfMoney());
        Assertions.assertEquals("testId", actual.creatorId());
    }

    @Test
    void addCategory() {
        //GIVEN
        NewCategory newCategory = new NewCategory();
        newCategory.setTitle("title");
        newCategory.setCreatorId("testId");
        newCategory.setCategoryType("expense");

        when(categoryRepo.save(any(TransactionCategory.class))).thenReturn(setUpCategory());

        //WHEN
        CategoryResponse actual = budgetService.addTransactionCategory(newCategory);

        //THEN
        Assertions.assertEquals("title", actual.title());
        Assertions.assertEquals("testId", actual.creatorId());
        Assertions.assertEquals("expense", actual.categoryType());
    }

    @Test
    void deleteTransactionEntry() {
        // GIVEN
        String transactionId = "1"; // Set the ID to match your sample transaction

        // Mock the deleteById method of the transactionRepo
        doNothing().when(transactionRepo).deleteById(transactionId);

        // WHEN
        budgetService.deleteTransactionEntry(transactionId);

        // THEN
        verify(transactionRepo).deleteById(transactionId);
    }


    @Test
    void deleteCategory() {
        // GIVEN
        String categoryId = "1";
        when(categoryRepo.findById(categoryId)).thenReturn(java.util.Optional.of(setUpCategory()));
        doNothing().when(categoryRepo).deleteById(categoryId);

        // WHEN
        budgetService.deleteCategory(categoryId);

        // THEN
        Mockito.verify(categoryRepo, Mockito.times(1)).deleteById(categoryId);
    }
}
