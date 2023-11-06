package controller;

import com.github.ryliecc.backend.controller.BudgetController;
import com.github.ryliecc.backend.models.categories.CategoryResponse;
import com.github.ryliecc.backend.models.categories.NewCategory;
import com.github.ryliecc.backend.models.categories.UpdatedCategory;
import com.github.ryliecc.backend.models.transaction.daily.NewTransaction;
import com.github.ryliecc.backend.models.transaction.daily.TransactionsResponse;
import com.github.ryliecc.backend.models.transaction.daily.UpdatedTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyTransactionResponse;
import com.github.ryliecc.backend.models.transaction.monthly.NewMonthlyTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.UpdatedMonthlyTransaction;
import com.github.ryliecc.backend.service.BudgetService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class BudgetControllerTest {

    @Mock
    private BudgetService budgetService;

    private BudgetController budgetController;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        budgetController = new BudgetController(budgetService);
    }

    @AfterEach
    void tearDown() throws Exception {
        if (closeable != null) {
            closeable.close();
        }
    }


    @Test
    void getTransactionsByCreatorId() {
        // GIVEN
        String creatorId = "testCreatorId";
        List<TransactionsResponse> responseList = new ArrayList<>();
        responseList.add(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId", "category", "daily_transaction"));

        when(budgetService.getTransactionsByCreatorId(creatorId)).thenReturn(responseList);

        // WHEN
        List<TransactionsResponse> result = budgetController.getTransactionsByCreatorId(creatorId);

        // THEN
        assertEquals(responseList, result);
    }

    @Test
    void getMonthlyTransactionsByCreatorId() {
        // GIVEN
        String creatorId = "testCreatorId";
        List<MonthlyTransactionResponse> responseList = new ArrayList<>();
        responseList.add(new MonthlyTransactionResponse("1", "title", "2020-01-01T12:00:00Z", "2024-01-01T12:00:00Z", "1.61", "testCreatorId", "category"));

        when(budgetService.getMonthlyTransactionsByCreatorId(creatorId)).thenReturn(responseList);

        // WHEN
        List<MonthlyTransactionResponse> result = budgetController.getMonthlyTransactionsByCreatorId(creatorId);

        // THEN
        assertEquals(responseList, result);
    }

    @Test
    void getBalanceByCreatorId() {
        // GIVEN
        String creatorId = "testCreatorId";
        String balance = "100.00";
        when(budgetService.getSumOfAmountsByCreatorId(creatorId)).thenReturn(balance);

        // WHEN
        String result = budgetController.getBalanceByCreatorId(creatorId);

        // THEN
        assertEquals(balance, result);
    }

    @Test
    void getCategoriesByCreatorId() {
        // GIVEN
        String creatorId = "testCreatorId";
        List<CategoryResponse> categoryList = new ArrayList<>();
        categoryList.add(new CategoryResponse("1", "title", "testId", "expense"));

        when(budgetService.getCategoriesByCreatorId(creatorId)).thenReturn(categoryList);

        // WHEN
        List<CategoryResponse> result = budgetController.getCategoriesByCreatorId(creatorId);

        // THEN
        assertEquals(categoryList, result);
    }

    @Test
    void getDailyBudgetByCreatorId() {
        // GIVEN
        String creatorId = "testCreatorId";
        String budget = "100.00";
        when(budgetService.calculateDailyBudget(creatorId)).thenReturn(budget);

        // WHEN
        String result = budgetController.getDailyBudgetByCreatorId(creatorId);

        // THEN
        assertEquals(budget, result);
    }

    @Test
    void addTransaction() {
        // GIVEN
        NewTransaction newTransaction = new NewTransaction();
        newTransaction.setTitle("title");
        newTransaction.setAmountOfMoney("1.61");
        newTransaction.setCreatorId("testId");

        TransactionsResponse response = new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId", "category", "daily_transaction");
        when(budgetService.addTransactionEntry(newTransaction)).thenReturn(response);

        // WHEN
        TransactionsResponse result = budgetController.addTransaction(newTransaction);

        // THEN
        assertEquals(response, result);
    }

    @Test
    void addMonthlyTransaction() {
        // GIVEN
        NewMonthlyTransaction newMonthlyTransaction = new NewMonthlyTransaction();
        newMonthlyTransaction.setTitle("title");
        newMonthlyTransaction.setStartDate("2020-01-01T12:00:00Z");
        newMonthlyTransaction.setTransactionCategory("category");
        newMonthlyTransaction.setCreatorId("testId");
        newMonthlyTransaction.setAmountOfMoney("1.61");

        MonthlyTransactionResponse response = new MonthlyTransactionResponse("1", "title", "2020-01-01T12:00:00Z", "2021-01-01T12:00:00Z", "1.61", "testId", "category");
        when(budgetService.addMonthlyTransaction(newMonthlyTransaction)).thenReturn(response);

        // WHEN
        MonthlyTransactionResponse result = budgetController.addMonthlyTransaction(newMonthlyTransaction);

        // THEN
        assertEquals(response, result);
    }

    @Test
    void addCategory() {
        // GIVEN
        NewCategory newCategory = new NewCategory();
        newCategory.setTitle("title");
        newCategory.setCreatorId("testId");
        newCategory.setCategoryType("expense");

        CategoryResponse response = new CategoryResponse("1", "title", "testId", "expense");
        when(budgetService.addTransactionCategory(newCategory)).thenReturn(response);

        // WHEN
        CategoryResponse result = budgetController.addCategory(newCategory);

        // THEN
        assertEquals(response, result);
    }


    @Test
    void deleteTransaction() {
        // GIVEN
        String transactionId = "testTransactionId";

        // No need for when() as it is a void method

        // WHEN
        // Act and verify
        assertDoesNotThrow(() -> budgetController.deleteTransaction(transactionId));

        // THEN
        verify(budgetService).deleteTransactionEntry(transactionId);
    }

    @Test
    void deleteMonthlyTransaction() {
        // GIVEN
        String transactionId = "testTransactionId";

        // WHEN
        assertDoesNotThrow(() -> budgetController.deleteMonthlyTransaction(transactionId));

        // THEN
        verify(budgetService).deleteMonthlyTransaction(transactionId);
    }

    @Test
    void deleteCategory() {
        // GIVEN
        String categoryId = "testCategoryId";

        // No need for when() as it is a void method

        // WHEN
        // Act and verify
        assertDoesNotThrow(() -> budgetController.deleteCategory(categoryId));

        // THEN
        verify(budgetService).deleteCategory(categoryId);
    }

    @Test
    void updateTransaction() {
        // GIVEN
        UpdatedTransaction updatedTransaction = new UpdatedTransaction();
        updatedTransaction.setId("1");
        updatedTransaction.setTitle("Updated Title");
        updatedTransaction.setAmountOfMoney("2.22");
        updatedTransaction.setTransactionCategory("Updated Category");

        TransactionsResponse response = new TransactionsResponse("1", "Updated Title", "2020-01-01T12:00:00Z", "2.22", "testId", "Updated Category", "daily_transaction");
        when(budgetService.updateTransactionEntry(updatedTransaction)).thenReturn(response);

        // WHEN
        TransactionsResponse result = budgetController.updateTransaction(updatedTransaction);

        // THEN
        assertEquals(response, result);
    }

    @Test
    void updateRecurringTransaction() {
        // GIVEN
        UpdatedMonthlyTransaction updatedTransaction = new UpdatedMonthlyTransaction();
        updatedTransaction.setId("1");
        updatedTransaction.setTitle("Updated Title");
        updatedTransaction.setStartDate("2020-01-01T12:00:00Z");
        updatedTransaction.setEndDate("2021-01-01T12:00:00Z");
        updatedTransaction.setAmountOfMoney("2.22");
        updatedTransaction.setTransactionCategory("Updated Category");

        MonthlyTransactionResponse response = new MonthlyTransactionResponse("1", "Updated Title", "2020-01-01T12:00:00Z", "2021-01-01T12:00:00Z", "2.22", "testId", "Updated Category");
        when(budgetService.updateMonthlyTransaction(updatedTransaction)).thenReturn(response);

        // WHEN
        MonthlyTransactionResponse result = budgetController.updateRecurringTransaction(updatedTransaction);

        // THEN
        assertEquals(response, result);
    }

    @Test
    void updateCategory() {
        // GIVEN
        UpdatedCategory updatedCategory = new UpdatedCategory();
        updatedCategory.setId("1");
        updatedCategory.setTitle("Updated Category Title");
        updatedCategory.setCategoryType("income");

        CategoryResponse response = new CategoryResponse("1", "Updated Category Title", "testId", "income");
        when(budgetService.updateCategory(updatedCategory)).thenReturn(response);

        // WHEN
        CategoryResponse result = budgetController.updateCategory(updatedCategory);

        // THEN
        assertEquals(response, result);
    }

}
