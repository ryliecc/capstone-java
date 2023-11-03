package com.github.ryliecc.backend.controller;

import com.github.ryliecc.backend.models.categories.CategoryResponse;
import com.github.ryliecc.backend.models.categories.NewCategory;
import com.github.ryliecc.backend.models.categories.UpdatedCategory;
import com.github.ryliecc.backend.models.transaction.daily.NewTransaction;
import com.github.ryliecc.backend.models.transaction.daily.TransactionsResponse;
import com.github.ryliecc.backend.models.transaction.daily.UpdatedTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.MonthlyTransactionResponse;
import com.github.ryliecc.backend.models.transaction.monthly.NewMonthlyTransaction;
import com.github.ryliecc.backend.models.transaction.monthly.UpdatedMonthlyTransaction;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.github.ryliecc.backend.service.BudgetService;

import java.util.List;

@RestController
@RequestMapping("/api/budget-app")
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;

    @GetMapping("/{creatorId}")
    @ResponseStatus(HttpStatus.OK)
    public List<TransactionsResponse> getTransactionsByCreatorId(@PathVariable String creatorId) {
        return budgetService.getTransactionsByCreatorId(creatorId);
    }

    @GetMapping("/monthly/{creatorId}")
    @ResponseStatus(HttpStatus.OK)
    public List<MonthlyTransactionResponse> getMonthlyTransactionsByCreatorId(@PathVariable String creatorId) {
        return budgetService.getMonthlyTransactionsByCreatorId(creatorId);
    }

    @GetMapping("/balance/{creatorId}")
    @ResponseStatus(HttpStatus.OK)
    public String getBalanceByCreatorId(@PathVariable String creatorId) {
        return budgetService.getSumOfAmountsByCreatorId(creatorId);
    }

    @GetMapping("/category/{creatorId}")
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> getCategoriesByCreatorId(@PathVariable String creatorId) {
        return budgetService.getCategoriesByCreatorId(creatorId);
    }

    @GetMapping("/daily-budget/{creatorId}")
    @ResponseStatus(HttpStatus.OK)
    public String getDailyBudgetByCreatorId(@PathVariable String creatorId) {
        return budgetService.calculateDailyBudget(creatorId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionsResponse addTransaction(@RequestBody NewTransaction newTransaction) {
        return budgetService.addTransactionEntry(newTransaction);
    }

    @PostMapping("/monthly")
    @ResponseStatus(HttpStatus.CREATED)
    public MonthlyTransactionResponse addMonthlyTransaction(@RequestBody NewMonthlyTransaction newMonthlyTransaction) {
        return budgetService.addMonthlyTransaction(newMonthlyTransaction);
    }

    @PostMapping("/category")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory (@RequestBody NewCategory newCategory) {
        return budgetService.addTransactionCategory(newCategory);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTransaction(@PathVariable String id) {
        budgetService.deleteTransactionEntry(id);
    }

    @DeleteMapping("/monthly/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteMonthlyTransaction(@PathVariable String id) {
        budgetService.deleteMonthlyTransaction(id);
    }

    @DeleteMapping("/category/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategory(@PathVariable String id) {
        budgetService.deleteCategory(id);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public TransactionsResponse updateTransaction(@RequestBody UpdatedTransaction updatedTransaction) {
        return budgetService.updateTransactionEntry(updatedTransaction);
    }

    @PutMapping("/monthly")
    @ResponseStatus(HttpStatus.OK)
    public MonthlyTransactionResponse updateRecurringTransaction(@RequestBody UpdatedMonthlyTransaction updatedTransaction) {
        return budgetService.updateMonthlyTransaction(updatedTransaction);
    }

    @PutMapping("/category")
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse updateCategory(@RequestBody UpdatedCategory updatedCategory) {
        return budgetService.updateCategory(updatedCategory);
    }
}
