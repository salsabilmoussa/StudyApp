package com.example.studyapp.services;

import com.example.studyapp.model.Subject;
import com.example.studyapp.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Optional<Subject> getSubjectById(String id) {
        return subjectRepository.findById(id);
    }

    public Subject updateSubject(String id, Subject subjectDetails) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);
        if (optionalSubject.isPresent()) {
            Subject subject = optionalSubject.get();
            subject.setTitle(subjectDetails.getTitle());
            subject.setDescription(subjectDetails.getDescription());
            subject.setProfessor(subjectDetails.getProfessor());
            subject.setImage(subjectDetails.getImage());
            subject.setSpecialty(subjectDetails.getSpecialty());
            return subjectRepository.save(subject);
        }
        return null;
    }

    public void deleteSubject(String id) {
        subjectRepository.deleteById(id);
    }
}
