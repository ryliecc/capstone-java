package com.github.ryliecc.backend.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.Instant;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class TransactionEntry {
    @MongoId
    private String id;
    private String title;
    private Instant timeLogged;
    private String amountOfMoney;
    private String creatorId;
    private String transactionCategory;
}
