package com.github.ryliecc.backend.models.categories;

import lombok.Builder;

@Builder
public record CategoryResponse(String id,
                               String title,
                               String creatorId,
                               String categoryType) {
}
