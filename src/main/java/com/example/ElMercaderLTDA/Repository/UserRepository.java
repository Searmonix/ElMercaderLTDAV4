package com.example.ElMercaderLTDA.Repository;

import com.example.ElMercaderLTDA.Model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;


public interface UserRepository extends MongoRepository<User, Integer>{
    
    // Encontrar por email digitado
    // @Query("{ 'email' : ?0}")  
    // ?0 significa el primer parámetro, email
    Optional<User> getUserByEmail(String email);

    // Encontrar por email y contraseña
    // @Query("{ 'email' : ?0, 'password' : ?1}")
    Optional<User> getUserByEmailAndPassword(String email, String password);
    
    // Encontrar por zona y tipo. ASE pueden acceder a este método
    // @Query("{ 'zone' : ?0, 'type' : ?1}")
    List<User> findAllByZoneAndType(String zone, String type);

    // Encontrar por zona y tipo. COORD pueden acceder a este método
    // @Query("{ 'zone' : ?0, 'type' : ?1}")
    Optional<User> getUserByZoneAndType(String zone, String type);

}
