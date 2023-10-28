package com.github.ryliecc.backend.controller;

import com.github.ryliecc.backend.models.*;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionsResponse addTransaction(@RequestBody NewTransaction newTransaction) {
        return budgetService.addTransactionEntry(newTransaction);
    }

    @PostMapping("/category")
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionCategory addCategory (@RequestBody NewCategory newCategory) {
        return budgetService.addTransactionCategory(newCategory);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTransaction(@PathVariable String id) {
        budgetService.deleteTransactionEntry(id);
    }

    @DeleteMapping("/category/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategory(@PathVariable String id) {
        budgetService.deleteCategory(id);
    }
}
