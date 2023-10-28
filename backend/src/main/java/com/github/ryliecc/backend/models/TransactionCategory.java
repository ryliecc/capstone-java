package com.github.ryliecc.backend.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class TransactionCategory {
    @MongoId
    private String id;
    private String title;
    private String creatorId;
    private String categoryType;
}
