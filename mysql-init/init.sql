CREATE TABLE IF NOT EXISTS invoices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  companyName VARCHAR(255),
  companyAddress TEXT,
  clientName VARCHAR(255),
  clientAddress TEXT,
  invoiceNumber VARCHAR(255),
  invoiceDate VARCHAR(50),
  dueDate VARCHAR(50),
  terms VARCHAR(100),
  items LONGTEXT,
  total DECIMAL(10,2),
  signature LONGTEXT
);