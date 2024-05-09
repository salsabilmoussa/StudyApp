package com.example.studyapp.service;

import com.example.studyapp.model.Groupe;
import com.example.studyapp.repository.GroupeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class GroupeService {

    @Autowired
    private GroupeRepository groupeRepository;

    public Groupe createGroupe(Groupe groupe) {
        Assert.notNull(groupe, "Groupe object must not be null");
        return groupeRepository.save(groupe);
    }

    public List<Groupe> getAllGroupes() {
        return groupeRepository.findAll();
    }

    public Groupe getGroupeById(String id) {
        Assert.notNull(id, "ID must not be null");
        Optional<Groupe> optionalGroupe = groupeRepository.findById(id);
        return optionalGroupe.orElse(null);
    }

    public Groupe updateGroupe(String id, Groupe groupe) {
        Assert.notNull(id, "ID must not be null");
        Assert.notNull(groupe, "Groupe object must not be null");
        
        Groupe existingGroupe = getGroupeById(id);
        if (existingGroupe != null) {
            if(groupe.getLastMessage() != null){
                existingGroupe.setLastMessage(groupe.getLastMessage());
                return groupeRepository.save(existingGroupe);
            }
            if(groupe.getName()!=null){
                existingGroupe.setName(groupe.getName());
                return groupeRepository.save(existingGroupe);
            }
            if(groupe.getPic() != null){
                existingGroupe.setPic(groupe.getPic());
                return groupeRepository.save(existingGroupe);
            }
        }
        return null;
    }

    public void deleteGroupe(String id) {
        Assert.notNull(id, "ID must not be null");
        groupeRepository.deleteById(id);
    }
}