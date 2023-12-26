package com.javainuse.repository;

import com.javainuse.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<org.springframework.security.core.userdetails.User> findByUsername(String username);
}
