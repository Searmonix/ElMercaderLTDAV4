package com.example.ElMercaderLTDA.Services;


import com.example.ElMercaderLTDA.Model.Gadget;
import com.example.ElMercaderLTDA.Repository.GadgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class GadgetServices {
    
    @Autowired
    private GadgetRepository gadgetRepository;

   public List<Gadget> getAll() {
        return gadgetRepository.findAll();
    }

    public Gadget getGadget(int id) {

        Optional<Gadget> gadgetExists = gadgetRepository.findById(id);
        // gadgetExists puede ser null o pueder retornar un gadget,
        // Cuando el gadget exista, traerlo.
        if (gadgetExists.isPresent()) {
            return gadgetExists.get();
        } else {
            //De ser null, no existir ese gadget, creará un nuevo gadget
            return new Gadget();
        }
    }

    public Gadget update(Gadget gadget) {
        // El gadget que vaya a ser actualizado debe existir
        if (gadget.getId() != null) {
            // Alguno de los campos puede ser nulo
            // Traemos el gadget que se vaya a actualizar mediante su Id
            // gadgetToUdate, es ahora un gadget, el gadget a actualizar,
            // podemos acceder a sus atributos y actualizar cada uno
            Optional<Gadget> gadgetToUpdate = gadgetRepository.findById(gadget.getId());

            if (gadgetToUpdate.isPresent()) {

                // Si la información que está siendo actualizada es algo
                if (gadget.getBrand() != null) {
                    // Usamos el set de el atributo, para que
                    // El atributo que esté siendo actualizado tenga el valor de la actualización
                    gadgetToUpdate.get().setBrand(gadget.getBrand());
                }

                if (gadget.getCategory() != null) {
                    gadgetToUpdate.get().setCategory(gadget.getCategory());
                }

                if (gadget.getName() != null) {
                    gadgetToUpdate.get().setName(gadget.getName());
                }

                if (gadget.getDescription() != null) {
                    gadgetToUpdate.get().setDescription(gadget.getDescription());
                }

                if (gadget.getPrice() != null) {
                    gadgetToUpdate.get().setPrice(gadget.getPrice());
                }

                if (gadget.getAvailability() != null) {
                    gadgetToUpdate.get().setAvailability(gadget.getAvailability());
                }

                if (gadget.getQuantity() != null) {
                    gadgetToUpdate.get().setQuantity(gadget.getQuantity());
                }

                if (gadget.getPhotography() != null) {
                    gadgetToUpdate.get().setPhotography(gadget.getPhotography());
                } 
                return gadgetRepository.save(gadgetToUpdate.get());

            }   

            return gadget;
        }

        return gadget;
    }

    public Gadget save(Gadget gadget) {
        return gadgetRepository.save(gadget);
    }

    public boolean delete(int id) {
        // Busca un elemento mediante un id,
        // map busca ese gadget y si está presente aplica la función de borrado
        Boolean stateOfDeletion = 
        gadgetRepository.findById(id)
        // El resultado de "gadgetRepository.findById(id)" lo utiliza 'map'
        // 'gadget' es un parámetro enviado por 'map'
        .map((gadget) -> {
            
            gadgetRepository.delete(gadget);
            return true;

        })
        // Regresa el valor 'true' si el resultado anterior fue exitoso
        // de otra manera, regresa 'false'
        .orElse(false);

        return stateOfDeletion;
    }

}
