CREATE TABLE Usuarios(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR (50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    admin BOOLEAN NOT NULL DEFAULT false
);

alter table usuarios add password VARCHAR(50) not null default '123456';

alter table usuarios add avatar VARCHAR(150) not null default 'avatar_default.jpg';

alter table usuarios add status BOOLEAN not null default true;


create table Productos(
	id SERIAL primary key,
	nombre varchar(255) not null,
	precio NUMERIC(11,2) not null default 9999999 check(precio > 0),
	stock INTEGER not null default 0 check(stock >=0),
	imagen text not null default 'https://placehold.co/600x400'
);


INSERT into productos(nombre, precio, stock) values
('Televisor Samsung 50 Pulgadas', 250000, 250),
('Televisor LG 50 Pulgadas', 230000, 200);


create table Ventas(
	id SERIAL primary key,
	fecha DATE not null default now(),
	id_usuario INTEGER not null references usuarios(id)
);

insert into ventas values
(default, default, 2);

select * from VENTAS;


create table detalle_ventas(
	id serial primary key,
	id_venta integer not null references ventas(id),
	id_producto integer not null references productos(id),
	cantidad integer not null default 1 check (cantidad >0),
	precio NUMERIC(11,2) not null check(precio > 0)
);

insert into detalle_ventas values
(default, 1, 1, 2, 250000);

create table carritos(
	id serial primary key,
	id_usuario integer not null references usuarios(id),
	id_producto integer not null references productos(id),
	cantidad integer not null default 1 check (cantidad >0)
);

insert into carritos values
(default, 3, 1, 2),
(default, 3, 2, 5);