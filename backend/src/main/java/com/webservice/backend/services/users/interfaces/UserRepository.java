package com.webservice.backend.services.users.interfaces;

import com.webservice.backend.services.users.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);
}
