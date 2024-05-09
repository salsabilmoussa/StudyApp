package com.example.studyapp.controller;
import com.example.studyapp.model.Course;
import com.example.studyapp.model.User;
import com.example.studyapp.services.CourseService;
import com.example.studyapp.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.util.StringUtils;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;


@CrossOrigin(origins = "http://localhost:8082")
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    // define a location
    public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";
    @Autowired
    private CourseService courseService;
    private UserService userService;
       public CourseController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/{id}")
    public ResponseEntity<Course> createCourse( @PathVariable String id,@RequestParam("cours") List<MultipartFile> cours,@RequestParam("td") List<MultipartFile> td,@RequestParam("tp") List<MultipartFile> tp,@RequestParam("course") MultipartFile courseBlob )throws IOException {
        Optional<User> userOptional = this.userService.getUserById(id);
        if (userOptional.isPresent()){
            User user = userOptional.get();
            String role = user.getRole();
            
           

            if ("teacher".equals(role)) {  
                ObjectMapper objectMapper = new ObjectMapper(); 
                 // Read course data from courseBlob
                 String courseContent = new String(courseBlob.getBytes(), StandardCharsets.UTF_8);
                 Course course = objectMapper.readValue(courseContent, Course.class);
                if (!cours.isEmpty()) {
                    for(MultipartFile file : cours) {
                        String filename = StringUtils.cleanPath(file.getOriginalFilename());
                        Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                        copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                        course.getCours().add(filename);
                    }
                }
                if (!td.isEmpty()) {
                    for(MultipartFile file : td) {
                        String filename = StringUtils.cleanPath(file.getOriginalFilename());
                        Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                        copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                        course.getTd().add(filename);
                    }
                }
                if (!tp.isEmpty()) {
                    for(MultipartFile file : tp) {
                        String filename = StringUtils.cleanPath(file.getOriginalFilename());
                        Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                        copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                        course.getTp().add(filename);
                    }
                }
                Course newCourse = courseService.createCourse(course);
                return ResponseEntity.ok(newCourse);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // User is not a teacher
            }
        } else {
            return ResponseEntity.notFound().build(); // User not found
        }
    }
    @PostMapping("/{userId}/{courseId}")
    public ResponseEntity<Course> addFilesToCourse(@PathVariable String courseId,
                                   @RequestParam("cours") List<MultipartFile> cours,
                                   @RequestParam("td") List<MultipartFile> td,
                                   @RequestParam("tp") List<MultipartFile> tp) throws IOException {

        Course course = courseService.getCourseById(courseId).orElse(null);
        if (course != null) {
            if (!cours.isEmpty()) {                               
                for (MultipartFile file : cours) {
                String filename = StringUtils.cleanPath(file.getOriginalFilename());
                Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                course.getCours().add(filename);
            }
        }
        if (!td.isEmpty()) {
            for(MultipartFile file : td) {
                String filename = StringUtils.cleanPath(file.getOriginalFilename());
                Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                course.getTd().add(filename);
            }
        }
        if (!tp.isEmpty()) {
            for(MultipartFile file : tp) {
                String filename = StringUtils.cleanPath(file.getOriginalFilename());
                Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
                copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
                course.getTp().add(filename);
            }
        }
        Course updatedCourse = courseService.updateCourse(courseId, course);
        return ResponseEntity.ok(updatedCourse);
    } else {
        return ResponseEntity.notFound().build(); // Course not found
    }

                                        
     
    }

    

    

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/{filename}")
    public ResponseEntity<Resource> getCourseByIdAndFile(@PathVariable String id,@PathVariable("filename") String filename)throws IOException  {
       
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
        if(!Files.exists(filePath)) {
            throw new FileNotFoundException(filename + " was not found on the server");
        }
        Resource resource = new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", filename);
        httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(httpHeaders).body(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course courseDetails) {
        Course updatedCourse = courseService.updateCourse(id, courseDetails);
        return ResponseEntity.ok(updatedCourse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }
}
