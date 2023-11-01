package service;

import com.github.ryliecc.backend.models.categories.CategoryResponse;
import com.github.ryliecc.backend.models.categories.NewCategory;
import com.github.ryliecc.backend.models.categories.TransactionCategory;
import com.github.ryliecc.backend.models.transaction.daily.NewTransaction;
import com.github.ryliecc.backend.models.transaction.daily.TransactionEntry;
import com.github.ryliecc.backend.models.transaction.daily.TransactionsResponse;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyRecurringTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyTransactionResponse;
import com.github.ryliecc.backend.models.transaction.monthly.NewMonthlyTransaction;
import com.github.ryliecc.backend.service.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;
import java.time.temporal.ChronoUnit;
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

        return new TransactionEntry("1", "title", fixedInstant, "1.61", "testId", "category", "daily_transaction");
    }

    private MonthlyRecurringTransaction setUpRecurringTransaction() {
        LocalDateTime startDateLocalDateTime = LocalDateTime.of(2020, 1, 1, 12, 0, 0);
        Instant startDateFixedInstant = startDateLocalDateTime.toInstant(ZoneOffset.UTC);
        LocalDateTime endDateLocalDateTime = LocalDateTime.of(2024, 1, 1, 12, 0, 0);
        Instant endDateFixedInstant = endDateLocalDateTime.toInstant(ZoneOffset.UTC);

        return new MonthlyRecurringTransaction("1", "title", startDateFixedInstant, endDateFixedInstant, "1.61", "testId", "category");
    }

    private TransactionCategory setUpCategory() {
        return new TransactionCategory("1", "title", "testId", "expense");
    }




    @Test
    void getAllTransactions() {
        //GIVEN
        List<TransactionsResponse> expected = List.of(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId", "category", "daily_transaction"));

        when(transactionRepo.findAll()).thenReturn(List.of(setUpTransaction()));

        //WHEN
        List<TransactionsResponse> actual = budgetService.getTransactionsByCreatorId("testId");

        //THEN
        Assertions.assertEquals(1, actual.size());
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getAllMonthlyTransactions() {
        // GIVEN
        List<MonthlyTransactionResponse> expected = List.of(new MonthlyTransactionResponse("1", "title", "2020-01-01T12:00:00Z", "2024-01-01T12:00:00Z", "1.61", "testId", "category"));

        when(recurringTransactionRepo.findAll()).thenReturn(List.of(setUpRecurringTransaction()));

        // WHEN
        List<MonthlyTransactionResponse> actual = budgetService.getMonthlyTransactionsByCreatorId("testId");

        // THEN
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
    void addMonthlyTransaction() {
        //GIVEN
        NewMonthlyTransaction newMonthlyTransaction = new NewMonthlyTransaction();
        newMonthlyTransaction.setTitle("title");
        newMonthlyTransaction.setStartDate("2020-01-01T12:00:00Z");
        newMonthlyTransaction.setEndDate("not set");
        newMonthlyTransaction.setAmountOfMoney("1.61");
        newMonthlyTransaction.setCreatorId("testId");
        newMonthlyTransaction.setTransactionCategory("category");

        when(recurringTransactionRepo.save(any(MonthlyRecurringTransaction.class))).thenReturn(setUpRecurringTransaction());

        //WHEN
        MonthlyTransactionResponse actual = budgetService.addMonthlyTransaction(newMonthlyTransaction);

        //THEN
        Assertions.assertEquals("title", actual.title());
        Assertions.assertEquals("2020-01-01T12:00:00Z", actual.startDate());
        Assertions.assertEquals("1.61", actual.amountOfMoney());
        Assertions.assertEquals("testId", actual.creatorId());
        Assertions.assertEquals("category", actual.transactionCategory());
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
        String transactionId = "1";

        doNothing().when(transactionRepo).deleteById(transactionId);

        // WHEN
        budgetService.deleteTransactionEntry(transactionId);

        // THEN
        verify(transactionRepo).deleteById(transactionId);
    }

    @Test
    void deleteMonthlyTransaction() {
        // GIVEN
        String transactionId = "1";

        doNothing().when(recurringTransactionRepo).deleteById(transactionId);

        // WHEN
        budgetService.deleteMonthlyTransaction(transactionId);

        // THEN
        verify(recurringTransactionRepo).deleteById(transactionId);
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

    @Test
    void calculateDailyBudget() {
        // GIVEN
        String creatorId = "testId";

        // Mock TransactionEntry objects with valid Instant values
        Instant now = Instant.now();
        TransactionEntry transaction1 = new TransactionEntry("1", "title1", now.minus(1, ChronoUnit.DAYS), "10.50", creatorId, "category1", "daily_transaction");
        TransactionEntry transaction2 = new TransactionEntry("2", "title2", now.minus(2, ChronoUnit.DAYS), "5.25", creatorId, "category2", "daily_transaction");

        when(transactionRepo.findAll()).thenReturn(List.of(transaction1, transaction2));

        // Calculate the expected daily budget
        BigDecimal expectedTotalAmount = new BigDecimal("10.50").add(new BigDecimal("5.25"));
        YearMonth currentYearMonth = YearMonth.now();
        int totalDaysInMonth = currentYearMonth.lengthOfMonth();
        int remainingDaysInMonth = totalDaysInMonth - LocalDate.now().getDayOfMonth() + 1;
        BigDecimal expectedDailyBudget = expectedTotalAmount.divide(BigDecimal.valueOf(remainingDaysInMonth), 2, RoundingMode.HALF_UP);

        // WHEN
        String dailyBudget = budgetService.calculateDailyBudget(creatorId);

        // THEN
        Assertions.assertEquals(expectedDailyBudget.toString(), dailyBudget);
    }



}
