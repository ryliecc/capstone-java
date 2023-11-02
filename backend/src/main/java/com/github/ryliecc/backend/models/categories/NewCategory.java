package com.github.ryliecc.backend.models.categories;

import lombok.Data;

@Data
public class NewCategory {
    private String title;
    private String creatorId;
    private String categoryType;
}
