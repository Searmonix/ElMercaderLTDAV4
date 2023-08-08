package com.example.ElMercaderLTDA.Services;

import com.example.ElMercaderLTDA.Model.User;
import com.example.ElMercaderLTDA.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
    
    @Autowired
    private UserRepository userRepository;


    public List<User> getAll() {
        return userRepository.findAll();
    }


    public User getUser(int id) {

        Optional<User> userExists = userRepository.findById(id);
        // userExists puede ser null o pueder retornar un usuario,
        // Cuando el usuario exista, traerlo.
        if (userExists.isPresent()) {

            return userExists.get();
        } else {
            //De ser null, no existir ese usuario, creará un nuevo usuario
            return new User();
        }
    }

    public User update(User user) {
        // El usuario que vaya a ser actualizado debe existir
        if (user.getId() != null) {
            // Alguno de los campos puede ser nulo
            // Traemos el usuario que se vaya a actualizar mediante su Id
            // userToUdate, es ahora un usuario, el usuario a actualizar,
            // podemos acceder a sus atributos y actualizar cada uno
            Optional<User> userToUpdate = userRepository.findById(user.getId());

            if (userToUpdate.isPresent()) {

                // Si la información que está siendo actualizada es algo
                if (user.getIdentification() != null) {
                    // Usamos el set de el atributo, para que
                    // El atributo que esté siendo actualizado tenga el valor de la actualización
                    userToUpdate.get().setIdentification(user.getIdentification());
                }

                if (user.getName() != null) {
                    userToUpdate.get().setName(user.getName());
                }

                if (user.getAddress() != null) {
                    userToUpdate.get().setAddress(user.getAddress());
                }

                if (user.getCellPhone() != null) {
                    userToUpdate.get().setCellPhone(user.getCellPhone());
                }

                if (user.getEmail() != null) {
                    userToUpdate.get().setEmail(user.getEmail());
                }

                if (user.getPassword() != null) {
                    userToUpdate.get().setPassword(user.getPassword());
                }

                if (user.getZone() != null) {
                    userToUpdate.get().setZone(user.getZone());
                }

                if (user.getType() != null) {
                    userToUpdate.get().setType(user.getType());
                }
                return userRepository.save(userToUpdate.get());
            }   

            return user;
        }

        return user;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean delete(int id) {
        // Busca un elemento mediante un id,
        // map busca ese usuario y si está presente aplica la función de borrado
        Boolean stateOfDeletion = 
        userRepository.findById(id)
        // El resultado de "userRepository.findById(id)" lo utiliza 'map'
        // 'user' es un parámetro enviado por 'map'
        .map((user) -> {
            
            userRepository.delete(user);
            return true;

        })
        // Regresa el valor 'true' si el resultado anterior fue exitoso
        // de otra manera, regresa 'false'
        .orElse(false);

        return stateOfDeletion;
    }

    public boolean emailIsUsed(String email) {
        Optional<User> userExists = userRepository.getUserByEmail(email);
        return userExists.isPresent();
    }

    public User userAuth(String email, String password) {
        Optional<User> userRegistered = userRepository.getUserByEmailAndPassword(email, password);
        // si el userRegistered.isPresent() no existe, regresará un nuevo usuario
        return userRegistered.orElseGet(() -> new User());
    }

    public User getZoneCoordinator(String zone) {
        Optional<User> coordUser = userRepository.getUserByZoneAndType(zone, "COORD");

        if (coordUser.isPresent()) {
            // Optional.get(); Regresa el valor no null que encontró
            return coordUser.get();
        } else {
            return new User();
        }

    }

    public boolean zoneSalesMan(String zone) {
        List<User> salesMan = userRepository.findAllByZoneAndType(zone, "ASE");
        /* Ya que necesitamos retornar un booleano que represente su existencia
        Pero List no tiene como método isPresent, se niega isEmpty para
        obtener el resultado deseado*/ 
        return !salesMan.isEmpty();
    }
}


