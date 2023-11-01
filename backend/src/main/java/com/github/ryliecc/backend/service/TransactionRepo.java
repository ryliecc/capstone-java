package com.github.ryliecc.backend.service;

import com.github.ryliecc.backend.models.transaction.daily.TransactionEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface TransactionRepo extends MongoRepository<TransactionEntry, String> {
    @Query("SELECT t FROM TransactionEntry t " +
            "WHERE t.referenceId = :id " +
            "AND t.timeLogged > :currentInstant")
    List<TransactionEntry> findAllByReferenceIdAndTimeLoggedAfter(@Param("id") String id, @Param("currentInstant") Instant currentInstant);
}
