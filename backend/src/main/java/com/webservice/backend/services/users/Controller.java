package com.webservice.backend.services.users;

import com.webservice.backend.services.users.interfaces.UserRepository;
import com.webservice.backend.services.users.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class Controller {

    @Autowired
    private UserRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = repository.findById(id);

        if (userData.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(userData.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<User> getUsers() {
        return repository.findAll();
    }


    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
            User userSaved = repository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(userSaved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        Optional<User> userData = this.repository.findById(id);

        if(userData.isPresent()) {
            User _user = userData.get();
            _user.setUsername(user.getUsername());
            _user.setPassword(user.getPassword());
            _user.setBirth(user.getBirth());

            User userSaved = repository.save(_user);
            return ResponseEntity.status(HttpStatus.OK).body(userSaved);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            repository.deleteById(id);
            return  ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

}
