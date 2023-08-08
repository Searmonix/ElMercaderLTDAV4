package com.example.ElMercaderLTDA.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ElMercaderLTDA.Model.Gadget;

public interface GadgetRepository extends MongoRepository<Gadget, Integer>{
    
}
