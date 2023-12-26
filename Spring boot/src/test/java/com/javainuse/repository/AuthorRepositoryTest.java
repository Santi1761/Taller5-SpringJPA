package com.javainuse.repository;

import com.javainuse.model.Author;
import com.javainuse.repository.AuthorRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class AuthorRepositoryTest {

    @Autowired
    private AuthorRepository authorRepository;

    @Test
    public void shouldFindAuthorById() {
        // Given
        Author author = new Author();
        author.setName("Test Author");
        author.setNationality("Test Nationality");
        Author savedAuthor = authorRepository.save(author);

        // When
        Author foundAuthor = authorRepository.findById(savedAuthor.getId()).orElse(null);

        // Then
        assertThat(foundAuthor).isNotNull();
        assertThat(foundAuthor.getName()).isEqualTo("Test Author");
        assertThat(foundAuthor.getNationality()).isEqualTo("Test Nationality");
    }

    @Test
    public void shouldSaveNewAuthor() {
        // Given
        Author author = new Author();
        author.setName("Test Author");
        author.setNationality("Test Nationality");

        // When
        Author savedAuthor = authorRepository.save(author);

        // Then
        assertThat(savedAuthor).isNotNull();
        assertThat(savedAuthor.getId()).isNotNull();
        assertThat(savedAuthor.getName()).isEqualTo("Test Author");
        assertThat(savedAuthor.getNationality()).isEqualTo("Test Nationality");
    }

    @Test
    public void shouldUpdateAuthor() {
        // Given
        Author author = new Author();
        author.setName("Test Author");
        author.setNationality("Test Nationality");
        Author savedAuthor = authorRepository.save(author);

        // When
        savedAuthor.setName("Updated Author");
        Author updatedAuthor = authorRepository.save(savedAuthor);

        // Then
        assertThat(updatedAuthor).isNotNull();
        assertThat(updatedAuthor.getId()).isEqualTo(savedAuthor.getId());
        assertThat(updatedAuthor.getName()).isEqualTo("Updated Author");
        assertThat(updatedAuthor.getNationality()).isEqualTo("Test Nationality");
    }

    @Test
    public void shouldDeleteAuthor() {
        // Given
        Author author = new Author();
        author.setName("Test Author");
        author.setNationality("Test Nationality");
        Author savedAuthor = authorRepository.save(author);

        // When
        authorRepository.deleteById(savedAuthor.getId());

        // Then
        assertThat(authorRepository.findById(savedAuthor.getId())).isEmpty();
    }
}
