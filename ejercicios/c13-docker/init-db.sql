-- Crear tablas iniciales
CREATE TABLE IF NOT EXISTS libros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO libros (titulo, autor) VALUES
('Don Quixote', 'Miguel de Cervantes'),
('1984', 'George Orwell'),
('The Great Gatsby', 'F. Scott Fitzgerald')
ON CONFLICT DO NOTHING;
