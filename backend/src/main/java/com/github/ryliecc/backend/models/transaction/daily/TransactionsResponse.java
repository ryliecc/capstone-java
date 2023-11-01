package com.github.ryliecc.backend.models.transaction.daily;

import lombok.Builder;

@Builder
public record TransactionsResponse(String id,
                                   String title,
                                   String timeLogged,
                                   String amountOfMoney,
                                   String creatorId,
                                   String transactionCategory,
                                   String referenceId) {

}
