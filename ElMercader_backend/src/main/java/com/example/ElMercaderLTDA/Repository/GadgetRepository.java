package com.example.ElMercaderLTDA.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.ElMercaderLTDA.Model.Gadget;

import java.util.List;

public interface GadgetRepository extends MongoRepository<Gadget, Integer>{
    
    @Query("{ 'price' : { $lt : ?0}}")
    public List<Gadget> findAllByPrice(Integer price);

    public List<Gadget> findAllByDescriptionContaining(String description);

}
