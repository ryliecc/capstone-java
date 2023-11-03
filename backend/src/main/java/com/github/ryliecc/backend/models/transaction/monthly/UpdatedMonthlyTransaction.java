package com.github.ryliecc.backend.models.transaction.monthly;

import lombok.Data;

@Data
public class UpdatedMonthlyTransaction {
    private String id;
    private String title;
    private String startDate;
    private String endDate;
    private String amountOfMoney;
    private String creatorId;
    private String transactionCategory;
}
