create table paises (
	id int auto_increment,
    fips varchar(2) not null,
    fips3 varchar(3) not null,
    nome varchar(60) not null,
    primary key (id)
);

create table estados (
	id int auto_increment,
    uf varchar(2) not null,
    nome varchar(40) not null,
    idPais int not null,
    primary key (id),
    foreign key (idPais) references paises(id)
);

create table cidades (
	id int auto_increment,
    sigla varchar(10),
    nome varchar(100) not null,
    idEstado int not null,
    primary key (id),
    foreign key (idEstado) references estados(id)
);

create table generos (
	id int auto_increment,
    label varchar(25) not null,
    primary key (id)
);

create table usuarios (
	id int auto_increment,
    nome varchar(100) not null,
    username varchar(50) not null,
    email varchar(100) not null,
    senha varchar(50) not null,
    cpf varchar(11) not null,
    dataNascimento date not null,
    telefone int(20),
    genero int not null,
    idPais int not null,
    idEstado int not null,
    idCidade int not null,
    primary key (id),
    foreign key (genero) references generos(id),
    foreign key (idPais) references paises(id),
    foreign key (idEstado) references estados(id),
    foreign key (idCidade) references cidades(id)
);