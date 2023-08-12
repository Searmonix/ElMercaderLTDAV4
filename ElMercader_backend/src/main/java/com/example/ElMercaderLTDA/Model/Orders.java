package com.example.ElMercaderLTDA.Model;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
/* Al ser una relación Uno a Muchos (Donde muchos productos
 pueden pertenecer a muchos usuarios distintos) se crea
 una nueva collección donde estarán los usuarios quienes
 realizaron la compra y los productos de la compra*/
@Document(collection = "orders")
public class Orders {
    
    @Id
    private Integer id;

    private Date registerDay;
    private String status;
    private User salesMan;
    // Map<key: Id product, value: corresponding product>
    private Map<Integer, Gadget> products;
    // Map<key: Id product, value: corresponding quantities>
    private Map<Integer, Integer> quantities;

}
