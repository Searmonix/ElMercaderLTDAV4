package com.example.ElMercaderLTDA.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ElMercaderLTDA.Model.Orders;
import com.example.ElMercaderLTDA.Repository.OrdersRepository;

@Service
public class OrderServices {
    
    @Autowired
    private OrdersRepository ordersRepository;

    public List<Orders> getAll() {
        return ordersRepository.findAll();
    }

    public Orders getOrders(int id) {

        Optional<Orders> ordersExist = ordersRepository.findById(id);

        if (ordersExist.isPresent()) {
            return ordersExist.get();
        } else {
            return new Orders();
        }

    }

    public List<Orders> getOrdersByZone(String zone) {
        return ordersRepository.findAllBySalesMan_Zone(zone);
    }

    public List<Orders> getOrdersBySalesMan(int id) {
        return ordersRepository.findAllBySalesMan__Id(id);
    }

    public Orders save(Orders orders) {
        return ordersRepository.save(orders);
    }

    public Orders update(Orders orders) {
        if(orders.getId() != null) {

            Optional<Orders> orderToUpdate = ordersRepository.findById(orders.getId());

            if (orderToUpdate.isPresent()) {
                if (orders.getRegisterDay() != null) {
                    orderToUpdate.get().setRegisterDay(orders.getRegisterDay());
                }

                if (orders.getStatus() != null) {
                    orderToUpdate.get().setStatus(orders.getStatus());
                }

                if (orders.getSalesMan() != null) {
                    orderToUpdate.get().setSalesMan(orders.getSalesMan());
                }

                if (orders.getProducts() != null) {
                    orderToUpdate.get().setProducts(orders.getProducts());
                }

                if (orders.getQuantities() != null) {
                    orderToUpdate.get().setQuantities(orders.getQuantities());
                }

                return ordersRepository.save(orderToUpdate.get());
            }
            
            return orders;
        }
        
        return orders;
    }

    public boolean delete(int id) {
        Boolean stateOfDeletion =

        ordersRepository.findById(id)
        .map((orders) -> {
            ordersRepository.delete(orders);
            return true;
        })
        .orElse(false);

        return stateOfDeletion;
    }
}
