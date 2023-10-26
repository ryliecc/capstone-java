package com.github.ryliecc.backend.controller;

import lombok.RequiredArgsConstructor;
import com.github.ryliecc.backend.models.NewTransaction;
import com.github.ryliecc.backend.models.TransactionsResponse;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionsResponse addTransaction(@RequestBody NewTransaction newTransaction) {
        return budgetService.addTransactionEntry(newTransaction);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTransaction(@PathVariable String id) {
        budgetService.deleteTransactionEntry(id);
    }
}
