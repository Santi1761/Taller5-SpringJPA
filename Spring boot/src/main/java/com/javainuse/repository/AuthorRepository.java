package com.javainuse.repository;

import org.springframework.stereotype.Repository;
import com.javainuse.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

}
