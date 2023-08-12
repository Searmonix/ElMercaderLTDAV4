package com.example.ElMercaderLTDA.Controller;

import com.example.ElMercaderLTDA.Model.Gadget;
import com.example.ElMercaderLTDA.Services.GadgetServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@CrossOrigin(origins= "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
@RequestMapping("/api/gadget")
public class GadgetController {
    
    @Autowired
    private GadgetServices gadgetServices;

    @GetMapping("/all")
    public List<Gadget> getAll() {
        return gadgetServices.getAll();
    }

    @GetMapping("/{id}")
    public Gadget getGadget(@PathVariable int id) {
        return gadgetServices.getGadget(id);
    }

    @GetMapping("/description/{description}")
    public List<Gadget> getGadgetByDescription(@PathVariable String description) {
        return gadgetServices.findAllByDescritpion(description);
    } 
    @GetMapping("/price/{price}")
    public List<Gadget> getGadgetByPrice(@PathVariable Integer price) {
        return gadgetServices.findAllByPrice(price);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget save(@RequestBody Gadget gadget) {
        return gadgetServices.save(gadget);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Gadget update(@RequestBody Gadget gadget) {
        return gadgetServices.update(gadget);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        gadgetServices.delete(id);
    } 

}
