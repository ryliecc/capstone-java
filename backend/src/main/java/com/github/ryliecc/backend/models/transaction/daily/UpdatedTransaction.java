package com.github.ryliecc.backend.models.transaction.daily;

import lombok.Data;

@Data
public class UpdatedTransaction {
    private String id;
    private String title;
    private String timeLogged;
    private String amountOfMoney;
    private String creatorId;
    private String transactionCategory;
    private String referenceId;
}
