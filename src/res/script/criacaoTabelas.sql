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
    senha varchar(250) not null,
    cpf varchar(11) not null,
    dataNascimento date not null,
    telefone int(20),
    genero int not null,
    idPais int not null,
    idEstado int not null,
    idCidade int not null,
    creator int(1) default 0,
    primary key (id),
    foreign key (genero) references generos(id),
    foreign key (idPais) references paises(id),
    foreign key (idEstado) references estados(id),
    foreign key (idCidade) references cidades(id)
);

create table quizzes (
	id int auto_increment,
    titulo varchar(100) not null,
    imagem varchar(500) not null,
    idCriador int not null,
    acessos int default 0,
    descricao varchar(500) not null,
    dataCriacao date not null,
    status int(1) not null,
    primary key (id),
    foreign key (idCriador) references usuarios(id)
);

create table solicitacoes  (
	id int auto_increment,
    usuario int not null,
    description varchar(2000) not null,
    dataSolicitacao date not null,
    retorno bool default false,
    idJogo int,
	primary key (id),
    foreign key (usuario) references usuarios(id)
);

create table perguntas (
	id int auto_increment,
    sequencia int(2) not null,
    pergunta varchar(200) not null,
    imagem varchar(500),
    tipoResposta int(1) not null,
    resposta varchar(10) not null,
    opcao1 varchar(30),
    opcao2 varchar(30),
    opcao3 varchar(30),
    opcao4 varchar(30),
    quizId int,
    primary key (id),
    foreign key (quizId) references quizzes(id)
);

create table respostas (
	id int auto_increment,
    resposta varchar(10),
    quizId int not null,
    perguntaId int not null,
    userId int not null,
    serie varchar(13) not null,
    primary key (id),
    foreign key (quizId) references quizzes(id),
    foreign key (perguntaId) references perguntas(id),
    foreign key (userId) references usuarios(id)
);