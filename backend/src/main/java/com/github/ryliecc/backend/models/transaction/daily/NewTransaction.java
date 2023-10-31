package com.github.ryliecc.backend.models.transaction.daily;

import lombok.Data;

@Data
public class NewTransaction {
    private String title;
    private String amountOfMoney;
    private String creatorId;
    private String transactionCategory;
}
