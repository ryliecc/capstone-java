package com.github.ryliecc.backend.models;

import lombok.Data;

@Data
public class NewCategory {
    private String title;
    private String creatorId;
    private String categoryType;
}
