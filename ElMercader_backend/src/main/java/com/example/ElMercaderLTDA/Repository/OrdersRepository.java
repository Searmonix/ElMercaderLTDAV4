package com.example.ElMercaderLTDA.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.ElMercaderLTDA.Model.Orders;

public interface OrdersRepository extends MongoRepository<Orders, Integer> {
    
    public List<Orders> findAllBySalesMan_Zone(String zone);

    public List<Orders> findAllBySalesMan_id(int id);

    public List<Orders> findAllByStatusAndSalesMan_id(String state, int id);

    public List<Orders> findAllByRegisterDayAndSalesMan_id(Date date, int id);

}
