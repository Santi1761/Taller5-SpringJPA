package com.javainuse.repository;

import com.javainuse.model.Book;
import com.javainuse.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void shouldSaveAndRetrieveBook() {
        // Given
        Book book = new Book("The Great Gatsby", "F. Scott Fitzgerald");

        // When
        bookRepository.save(book);
        Optional<Book> retrievedBook = bookRepository.findById(book.getId());

        // Then
        assertTrue(retrievedBook.isPresent());
        assertEquals(book.getTitle(), retrievedBook.get().getTitle());
        assertEquals(book.getAuthor(), retrievedBook.get().getAuthor());
    }

    @Test
    public void shouldRetrieveAllBooks() {
        // Given
        Book book1 = new Book("To Kill a Mockingbird", "Harper Lee");
        Book book2 = new Book("1984", "George Orwell");

        // When
        bookRepository.saveAll(List.of(book1, book2));
        List<Book> allBooks = bookRepository.findAll();

        // Then
        assertEquals(2, allBooks.size());
        assertTrue(allBooks.stream().anyMatch(b -> Objects.equals(book1.getTitle(), b.getTitle())));
        assertTrue(allBooks.stream().anyMatch(b -> Objects.equals(book2.getTitle(), b.getTitle())));
    }


    @Test
    public void shouldDeleteBook() {
        // Given
        Book book = new Book("The Catcher in the Rye", "J.D. Salinger");
        bookRepository.save(book);

        // When
        bookRepository.deleteById(book.getId());

        // Then
        Optional<Book> retrievedBook = bookRepository.findById(book.getId());
        assertTrue(retrievedBook.isEmpty());
    }
}

