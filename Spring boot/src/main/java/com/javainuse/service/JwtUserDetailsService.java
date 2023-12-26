package com.javainuse.service;

import java.util.ArrayList;
import java.util.Optional;

import com.javainuse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if ("jesus".equals(username)) {
			// Usuario por defecto
			return new org.springframework.security.core.userdetails.User(
					"jesus",
					"$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
					new ArrayList<>()); // Puedes agregar roles si es necesario
		}
		Optional<User> optionalUser = userRepository.findByUsername(username);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			System.out.println("User found: " + user.getUsername());
			return new org.springframework.security.core.userdetails.User(
					user.getUsername(),
					user.getPassword(),
					new ArrayList<>()); // Puedes agregar roles si es necesario
		} else {
			System.out.println("User not found with username: " + username);
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}
