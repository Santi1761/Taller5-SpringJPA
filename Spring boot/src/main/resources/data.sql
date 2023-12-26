-- Crear tablas
CREATE TABLE IF NOT EXISTS author (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      name VARCHAR(255),
    nationality VARCHAR(255)
    );

CREATE TABLE IF NOT EXISTS book (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    title VARCHAR(255),
    publication_date DATE,
    author_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES author(id)
    );

-- Insertar autores
INSERT INTO author (name, nationality) VALUES ('Santiago', 'Colombia');
INSERT INTO author (name, nationality) VALUES ('Milei', 'Argentina');

-- Insertar libros
INSERT INTO book (title, publication_date, author_id) VALUES ('100 años de soledad', '2023-01-01', 1);
INSERT INTO book (title, publication_date, author_id) VALUES ('Libro', '2023-01-02', 1);
INSERT INTO book (title, publication_date, author_id) VALUES ('Libro3', '2023-01-03', 2);
