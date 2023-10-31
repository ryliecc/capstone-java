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
import com.github.ryliecc.backend.service.BudgetMappingService;
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
        transactionEntry.setCreatorId("testId");

        // WHEN
        TransactionsResponse actual = budgetMappingService.mapTransactionToResponse(transactionEntry);

        // THEN
        Assertions.assertEquals("id", actual.id());
        assert actual.title().equals("title");
        assert actual.amountOfMoney().equals("13.12");
        assert actual.timeLogged() != null;
        assert actual.creatorId().equals("testId");

    }

    @Test
    void mapNewTransactionToTransactionEntry() {
        // GIVEN
        NewTransaction newTransaction = new NewTransaction();
        newTransaction.setTitle("title");
        newTransaction.setAmountOfMoney("4.20");
        newTransaction.setCreatorId("testId");

        // WHEN
        TransactionEntry actual = budgetMappingService.mapNewTransactionToTransactionEntry(newTransaction);

        // THEN
        Assertions.assertEquals("title", actual.getTitle());
        assert actual.getAmountOfMoney().equals("4.20");
        assert actual.getTimeLogged() != null;
        assert actual.getCreatorId().equals("testId");
    }

    @Test
    void mapCategoryToResponse() {
        // GIVEN
        TransactionCategory transactionCategory = new TransactionCategory();
        transactionCategory.setId("category_id");
        transactionCategory.setTitle("category_title");
        transactionCategory.setCreatorId("category_creator_id");
        transactionCategory.setCategoryType("category_type");

        // WHEN
        CategoryResponse actual = budgetMappingService.mapCategoryToResponse(transactionCategory);

        // THEN
        Assertions.assertEquals("category_id", actual.id());
        assert actual.title().equals("category_title");
        assert actual.creatorId().equals("category_creator_id");
        assert actual.categoryType().equals("category_type");
    }

    @Test
    void mapNewCategoryToTransactionCategory() {
        // GIVEN
        NewCategory newCategory = new NewCategory();
        newCategory.setTitle("new_category_title");
        newCategory.setCreatorId("new_category_creator_id");
        newCategory.setCategoryType("new_category_type");

        // WHEN
        TransactionCategory actual = budgetMappingService.mapNewCategoryToTransactionCategory(newCategory);

        // THEN
        Assertions.assertEquals("new_category_title", actual.getTitle());
        assert actual.getCreatorId().equals("new_category_creator_id");
        assert actual.getCategoryType().equals("new_category_type");
    }

    @Test
    void mapRecurringTransactionToResponse() {
        // GIVEN
        MonthlyRecurringTransaction recurringTransaction = new MonthlyRecurringTransaction();
        recurringTransaction.setId("recurring_id");
        recurringTransaction.setTitle("recurring_title");
        recurringTransaction.setStartDate(Instant.now());
        recurringTransaction.setAmountOfMoney("99.99");
        recurringTransaction.setCreatorId("testId");
        recurringTransaction.setTransactionCategory("category");

        // WHEN
        MonthlyTransactionResponse actual = budgetMappingService.mapRecurringTransactionToResponse(recurringTransaction);

        // THEN
        Assertions.assertEquals("recurring_id", actual.id());
        assert actual.title().equals("recurring_title");
        assert actual.startDate() != null;
        assert actual.amountOfMoney().equals("99.99");
        assert actual.creatorId().equals("testId");
        assert actual.transactionCategory().equals("category");
    }

    @Test
    void mapNewMonthlyTransactionToRecurringTransaction() {
        // GIVEN
        NewMonthlyTransaction newMonthlyTransaction = new NewMonthlyTransaction();
        newMonthlyTransaction.setTitle("new_monthly_title");
        newMonthlyTransaction.setStartDate("2023-10-01T12:00:00Z");
        newMonthlyTransaction.setAmountOfMoney("123.45");
        newMonthlyTransaction.setCreatorId("testId");
        newMonthlyTransaction.setTransactionCategory("new_category");

        // WHEN
        MonthlyRecurringTransaction actual = budgetMappingService.mapNewMonthlyTransactionToRecurringTransaction(newMonthlyTransaction);

        // THEN
        Assertions.assertEquals("new_monthly_title", actual.getTitle());
        assert actual.getStartDate() != null;
        assert actual.getAmountOfMoney().equals("123.45");
        assert actual.getCreatorId().equals("testId");
        assert actual.getTransactionCategory().equals("new_category");
    }


}
