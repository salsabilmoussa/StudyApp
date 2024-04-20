package com.example.studyapp.model;
    import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;
    
    import java.util.Date;
    import java.util.List;
    
    @Document(collection = "user")
    public class User {
    
        @Id
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private Date birthday;
        private String speciality;
        private String password;
        private String authorization;
        private String role;
        private List<String> favorites;
    
        // Constructors, getters, and setters
    
        public User() {
        }
    
        public User(String firstName, String lastName, String email, String phone, Date birthday, String speciality, String password, String authorization, String role, List<String> favorites) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phone = phone;
            this.birthday = birthday;
            this.speciality = speciality;
            this.password = password;
            this.authorization = authorization;
            this.role = role;
            this.favorites = favorites;
        }
    
        // Getters and Setters
    
        public String getId() {
            return id;
        }
    
        public void setId(String id) {
            this.id = id;
        }
    
        public String getFirstName() {
            return firstName;
        }
    
        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }
    
        public String getLastName() {
            return lastName;
        }
    
        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
    
        public String getEmail() {
            return email;
        }
    
        public void setEmail(String email) {
            this.email = email;
        }
    
        public String getPhone() {
            return phone;
        }
    
        public void setPhone(String phone) {
            this.phone = phone;
        }
    
        public Date getBirthday() {
            return birthday;
        }
    
        public void setBirthday(Date birthday) {
            this.birthday = birthday;
        }
    
        public String getSpeciality() {
            return speciality;
        }
    
        public void setSpeciality(String speciality) {
            this.speciality = speciality;
        }
    
        public String getPassword() {
            return password;
        }
    
        public void setPassword(String password) {
            this.password = password;
        }
    
        public String getAuthorization() {
            return authorization;
        }
    
        public void setAuthorization(String authorization) {
            this.authorization = authorization;
        }
    
        public String getRole() {
            return role;
        }
    
        public void setRole(String role) {
            this.role = role;
        }
    
        public List<String> getFavorites() {
            return favorites;
        }
    
        public void setFavorites(List<String> favorites) {
            this.favorites = favorites;
        }
    
        @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", birthday=" + birthday +
                ", speciality='" + speciality + '\'' +
                ", password='" + password + '\'' +
                ", authorization='" + authorization + '\'' +
                ", roles=" + role +
                ", favorites=" + favorites +
                '}';
    }


    }
    