package com.github.ryliecc.backend.models.categories;

import lombok.Data;

@Data
public class UpdatedCategory {
    private String id;
    private String title;
    private String creatorId;
    private String categoryType;
}
