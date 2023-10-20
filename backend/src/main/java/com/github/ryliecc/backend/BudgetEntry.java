package com.github.ryliecc.backend;

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
public class BudgetEntry {
    @MongoId
    private String id;
    private String title;
    private Instant timeLogged;
    private double amountOfMoney;
}
