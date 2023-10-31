package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.categories.TransactionCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends MongoRepository<TransactionCategory, String> {
}
