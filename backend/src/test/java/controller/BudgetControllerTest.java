package controller;

import com.github.ryliecc.backend.controller.BudgetController;
import com.github.ryliecc.backend.models.*;
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
        responseList.add(new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId"));

        when(budgetService.getTransactionsByCreatorId(creatorId)).thenReturn(responseList);

        // WHEN
        List<TransactionsResponse> result = budgetController.getTransactionsByCreatorId(creatorId);

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
    void addTransaction() {
        // GIVEN
        NewTransaction newTransaction = new NewTransaction();
        newTransaction.setTitle("title");
        newTransaction.setAmountOfMoney("1.61");
        newTransaction.setCreatorId("testId");

        TransactionsResponse response = new TransactionsResponse("1", "title", "2020-01-01T12:00:00Z", "1.61", "testId");
        when(budgetService.addTransactionEntry(newTransaction)).thenReturn(response);

        // WHEN
        TransactionsResponse result = budgetController.addTransaction(newTransaction);

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
}
