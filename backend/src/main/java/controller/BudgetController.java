package controller;

import lombok.RequiredArgsConstructor;
import models.NewTransaction;
import models.TransactionsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import service.BudgetService;

import java.util.List;

@RestController
@RequestMapping("/api/budget-app")
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetService budgetService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<TransactionsResponse> getAllTransactions() {
        return budgetService.getAllTransactions();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionsResponse addTransaction(@RequestBody NewTransaction newTransaction) {
        return budgetService.addTransactionEntry(newTransaction);
    }
}
