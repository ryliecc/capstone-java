package com.github.ryliecc.backend.models;

import lombok.Data;

@Data
public class NewTransaction {
    private String title;
    private String amountOfMoney;
    private String creatorId;
    private String transactionCategory;
}
