package com.example.ElMercaderLTDA.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ElMercaderLTDA.Model.Orders;

public interface OrdersRepository extends MongoRepository<Orders, Integer>{
    
    public List<Orders> findAllBySalesMan_Zone(String zone);

    public List<Orders> findAllBySalesMan__Id(int id);
}
