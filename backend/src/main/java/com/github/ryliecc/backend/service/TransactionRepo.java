package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.transaction.daily.TransactionEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepo extends MongoRepository<TransactionEntry, String> {
}
