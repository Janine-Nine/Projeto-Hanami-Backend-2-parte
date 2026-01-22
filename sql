CREATE DATABASE hanami;
USE hanami;

-- Upload de arquivos
CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Regiões
CREATE TABLE regions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Produtos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Clientes
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vendas
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  customer_id INT NOT NULL,
  region_id INT NOT NULL,
  quantity INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  sale_date DATE NOT NULL,

  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- Métricas financeiras
CREATE TABLE financial_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  revenue DECIMAL(12,2),
  expenses DECIMAL(12,2),
  profit DECIMAL(12,2),
  reference_month VARCHAR(20)
);
