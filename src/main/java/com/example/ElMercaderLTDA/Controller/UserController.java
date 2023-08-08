package com.example.ElMercaderLTDA.Controller;

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

import com.example.ElMercaderLTDA.ErrorHandler.emailIsAlreadyUsedException;
import com.example.ElMercaderLTDA.ErrorHandler.userNotFoundException;
import com.example.ElMercaderLTDA.Model.User;
import com.example.ElMercaderLTDA.Services.UserServices;

import java.util.List;

@RestController
@CrossOrigin(origins= "*", methods = {
    RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE
})
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserServices userServices;

    @GetMapping("/all")
    public List<User> getAll() {
        return userServices.getAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        return userServices.getUser(id);
    }

    @GetMapping("coord/{zone}")
    public User getZoneCoordinator(@PathVariable String zone) {
        return userServices.getZoneCoordinator(zone);
    }

    @GetMapping("salesman/{zone}")
    public boolean zoneSalesMan(@PathVariable String zone) {
        return userServices.zoneSalesMan(zone);
    }

    @GetMapping("/emailexist/{email}")
    public boolean emailIsUsed(@PathVariable String email) {
        return userServices.emailIsUsed(email);
    }

    @GetMapping("/{email}/{password}")
    public User userAuth(@PathVariable String email, @PathVariable String password) {
        User userWEmailAndPass = userServices.userAuth(email, password);

        if (userWEmailAndPass.getId() == null)
            throw new userNotFoundException(email, password);
        return userWEmailAndPass;
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user) {
        
        if (userServices.emailIsUsed(user.getEmail())) {
            throw new emailIsAlreadyUsedException(user.getEmail());
        } else {
            return userServices.save(user);
        }
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user) {
        return userServices.update(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        userServices.delete(id);
    }  
    
}
