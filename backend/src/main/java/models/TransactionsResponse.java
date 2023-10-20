package models;

import lombok.Builder;

@Builder
public record TransactionsResponse(String id,
                                   String title,
                                   String timeLogged,
                                   String amountOfMoney) {

}
