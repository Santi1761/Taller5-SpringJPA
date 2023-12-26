package com.javainuse.dto;

import java.io.Serializable;

public class UserDTO {
    private String username;
    private String password;

    // constructores, getters y setters

    public UserDTO() {
    }

    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // otros métodos si es necesario

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

