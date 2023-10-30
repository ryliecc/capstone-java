package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.TransactionCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends MongoRepository<TransactionCategory, String> {
}
