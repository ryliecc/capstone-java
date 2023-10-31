package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.MonthlyRecurringTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthlyRecurringTransactionRepo extends MongoRepository<MonthlyRecurringTransaction, String> {
}
