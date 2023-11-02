package com.github.ryliecc.backend.models.transaction.monthly;

import lombok.Data;

@Data
public class NewMonthlyTransaction {
    private String title;
    private String startDate;
    private String endDate;
    private String amountOfMoney;
    private String creatorId;
    private String transactionCategory;
}
