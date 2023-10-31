package com.github.ryliecc.backend.models.transaction.monthly;

import lombok.Builder;

@Builder
public record MonthlyTransactionResponse(String id,
                                         String title,
                                         String startDate,
                                         String amountOfMoney,
                                         String creatorId,
                                         String transactionCategory) {
}
