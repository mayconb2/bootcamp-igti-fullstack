CREATE TABLE LIVRO (
  cod_livro INT NOT NULL,
  Titulo varchar(50),
  Nome_Editora varchar(50)
  PRIMARY KEY (cod_livro),
  FOREIGN KEY (nome_editora)
);
  
CREATE TABLE LIVRO_AUTOR (
    cod_livro INT NOT NULL,
    Nome_autor varchar(50),
    CONSTRAINT cod_livro
      FOREIGN KEY (cod_livro)
      REFERENCES LIVRO (cod_livro)
);
  
  CREATE TABLE EDITORA (
    Nome varchar(50),
    Endereço varchar(50),
    Telefone varchar(50)
  );
    
CREATE TABLE LIVRO_COPIAS (
  cod_livro INT NOT NULL,
  cod_unidade INT NOT NULL,
  qt_copias INT
);

CREATE TABLE LIVRO_EMPRESTIMO (
  cod_livro INT NOT NULL,
  cod_unidade INT NOT NULL,
  nr_cartao varchar(20),
  data_emprestimo date,
  data_devolucao date
);

CREATE TABLE UNIDADE_BIBLIOTECA (
  cod_livro INT NOT NULL,
  nome_unidade varchar(50),
  encereco varchar(75)
);

CREATE TABLE USUARIO (
  num_cartao varchar(20),
  Nome varchar(50),
  endereco varchar(75),
  telefone varchar(11)
);




  