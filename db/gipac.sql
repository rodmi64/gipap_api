drop database if exists gipac;
create database if not exists gipac;
use gipac;
create table if not exists anuncio
(
    id_anuncion      int auto_increment primary key,
    detalle_anuncio  text,
    url_foto_anuncio longtext,
    estado           smallint(1) default 1
);
create table if not exists rol
(
    id_rol  int auto_increment primary key,
    detalle varchar(250),
    estado  smallint(1) default 1
);
create table if not exists usuario
(
    email_usuario    varchar(250) primary key,
    contrasenia      longtext not null,
    nombre_usuario   varchar(250),
    telefono_usuario varchar(50),
    dni_usuario      varchar(50),
    sexo_usuario     smallint(1) default 1 comment '1 -> MASCULINO 0 -> FEMENINO',
    estado           smallint(1) default 1,
    fk_id_rol        int      not null
);
create table if not exists tipo_departamento
(
    id_tipo_departamento      int auto_increment primary key,
    detalle_tipo_departamento text not null,
    precio_arriendo           decimal(6, 2) default 200.00,
    estado                    smallint(1)   default 1
);
create table if not exists departamento
(
    code_departamento       varchar(10) primary key,
    num_piso                smallint    default 1,
    detalle_departamento    longtext,
    fk_id_tipo_departamento int not null,
    estado                  smallint(1) default 1 comment '1 -> activo (disponible) ... 0 inactivo (elimnado) .... 2 arrendado'
);
create table if not exists vehiculo
(
    placa_vehiculo   varchar(10) primary key,
    modelo_vehiculo  varchar(250),
    detalle_vehiculo longtext,
    fk_email_usuario varchar(250) not null,
    estado           smallint(1) default 1
);
create table if not exists usuario_departamento
(
    usuario_departamento       int auto_increment primary key,
    fk_email_usuario           varchar(250) not null,
    fk_code_departamento       varchar(10)  not null,
    fecha_arrendamiento        datetime    default now(),
    fecha_cancelacion_arriendo datetime,
    estado                     smallint(1) default 1 comment '1-> activo ... 0 inactivo (el usuario dejop de arrendar)'
);
create table if not exists rubro
(
    id_rubro      int primary key auto_increment,
    detalle_rubro varchar(250),
    precio_rubro  decimal(10, 2) default 0.00,
    estado        smallint(1)    default 1
);
create table if not exists tipo_pago
(
    id_tipo_pago      int auto_increment primary key,
    detalle_tipo_pago varchar(250)
);
create table if not exists pago_departamento
(
    id_pago_departamento int primary key auto_increment,
    fecha_creacion       datetime    default now(),
    motivo               varchar(250),
    code_referencia      varchar(250),
    fk_code_departamento varchar(10),
    foto_url_deposito    longtext,
    fk_email_usuario     varchar(250),
    fk_tipo_pago         int,
    fk_cuenta_banco      varchar(250),
    estado               smallint(1) default 1 comment '1 -> en espera de pago...... 2 -> en proceso de verificacion ..... 3 -> verificado y comprobado ..... 4 -> error al comprobar el comprobante'
);
create table if not exists banco
(
    id_banco      int auto_increment primary key,
    detalle_banco varchar(250) collate utf8mb4_general_ci
);
create table if not exists cuenta_bancaria
(
    num_cuenta_bancaria varchar(50) primary key,
    fk_email_usuario    varchar(250),
    fk_banco            int
);

create table if not exists tipo_soporte
(
    id_tipo_soporte int primary key auto_increment,
    detalle_soporte varchar(250) not null,
    estado          smallint(1) default 1
);

create table if not exists soporte
(
    id_soporte              int primary key auto_increment,
    fk_tipo_soporte         int          not null,
    fecha_apertura          datetime     not null,
    detalle_soporte         longtext,
    usuario_emisor_ticket   varchar(250) not null,
    url_img                 longtext,
    url_archivo             longtext,
    asunto_soporte          longtext,
    usuario_receptor_ticket varchar(250),
    solucion_ticket         longtext,
    fecha_solucion          datetime,
    estado                  smallint(1) default 1 comment '1 -> enviado .... 2 -> en proceso ... 3 -> finalizado ... 0 -> cancelado'
);

create table if not exists arrendamiento
(
    id_arrendamiento      int primary key auto_increment,
    fk_email_usuario      varchar(250) not null,
    fk_code_departamento  varchar(10)  not null,
    fecha_arrendamiento   datetime    default now(),
    fecha_pago            datetime,
    detalle_arrendamiento longtext,
    fecha_desalojo        datetime,
    detalle_desalojo      longtext,
    estado                smallint(1) default 1 comment '1 -> arrendado .... 0 -> cancelado .... 2 -> desalojado/terminado'
);


create table sector(code_sector char(10) primary key,detalle varchar(250),estado smallint(1) default 1);

create table pago_rubro(id_pago_rubro int primary key auto_increment,fk_code_departamento varchar(10) not null,
                        fk_id_rubro int not null,fechaAsignacion datetime default now(),
                        foto_recibo longtext,fk_email_usuario varchar(250),fk_cuenta_banco varchar(250),
                        estado smallint(1) default 1 comment '0->anulado,1 _>pendiente,2->revisar recibo,3->verificado y pagado');

create table tipo_servicio(id_tipo_servicio int primary key auto_increment,detalle_servicio varchar(250),
             hora_inicio time default '08:00',hora_fin time default '20:00',estado smallint(1) default 1);

create table reserva_servicio(id_reserva_servicio int primary key auto_increment,
             fk_id_tipo_servicio int not null,
             fk_email_usuario varchar(250) not null,
             hora_inicio_reserva time not null,
             hora_fin_reserva time not null,
             motivo_rechazo longtext,
             estado_reserva smallint(1) default 1 comment '1->en espera,2->reservado,3->rechazado');




/******** SQL POR DEFECTOS ********/
insert into rol(detalle)
values ('Administrador');
insert into rol(detalle)
values ('Clientes');
insert into rol(detalle)
values ('Servicios');
insert into usuario(email_usuario, contrasenia, nombre_usuario, telefono_usuario, dni_usuario, fk_id_rol)
VALUES ('guaman1579@gmail.com', MD5('12345678'), 'Administrador',
        '0993706012', '0604666982', 1);
insert into banco(detalle_banco)
values ('BANCO CENTRAL DEL ECUADOR');
insert into banco(detalle_banco)
values ('BANCO NACIONAL DE FOMENTO');
insert into banco(detalle_banco)
values ('BANCO AMAZONAS');
insert into banco(detalle_banco)
values ('BANCO DEL PACIFICO');
insert into banco(detalle_banco)
values ('BANCO PICHINCHA');
insert into banco(detalle_banco)
values ('BANCO DE MACHALA');
insert into banco(detalle_banco)
values ('BANCO SUDAMERICANO');
insert into banco(detalle_banco)
values ('PRODUBANCO');
insert into banco(detalle_banco)
values ('BANCO INTERNACIONAL');
insert into banco(detalle_banco)
values ('COOPERATIVA DE AHORRO Y CRÉDITO CÁMARA DE COMERCIO AMBATO');
insert into banco(detalle_banco)
values ('BANCO PROMERICA');
insert into banco(detalle_banco)
values ('COOPERATIVA DE AHORRO Y CRÉDITO “EL DISCAPACITADO” LTDA.');
insert into banco(detalle_banco)
values ('BANCO CAPITAL S.A.');
insert into banco(detalle_banco)
values ('FINANCIERA DE LA REPUBLICA S.A “FIRESA”');

insert into tipo_pago(detalle_tipo_pago)
values ('TRANSFERENCIA PROPIO BANCO');
insert into tipo_pago(detalle_tipo_pago)
values ('TRANSFERECIA INTERBANCARIA');
insert into tipo_pago(detalle_tipo_pago)
values ('PAGO INMEDIATO');
insert into tipo_pago(detalle_tipo_pago)
values ('DEPOSITO BANCARIO');

insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo)
VALUES ('Estudio/estudio convertible', 250);
insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo)
VALUES ('Departamento de interés social', 350);
insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo)
VALUES ('Loft', 500);
insert into tipo_departamento(detalle_tipo_departamento, precio_arriendo)
VALUES ('Duplex o Triplex', 800);

insert into rubro(detalle_rubro, precio_rubro)
values ('ARANCEL CUOTA ESTACIONAMIENTO', 10.50);
insert into rubro(detalle_rubro, precio_rubro)
values ('ARANCEL ALUMBRAMIENTO', 5);
insert into rubro(detalle_rubro, precio_rubro)
values ('ARANCEL REMODELACION DE VIAS', 50);

insert into tipo_soporte(detalle_soporte, estado)
VALUES ('RECLAMOS', 1);
insert into tipo_soporte(detalle_soporte, estado)
VALUES ('RESERVA DE SERVICIO', 1);
insert into tipo_soporte(detalle_soporte, estado)
VALUES ('SOLICITUD DE ARRENDAMIENTO', 1);
insert into tipo_soporte(detalle_soporte, estado)
VALUES ('OTROS', 1);

insert into sector(code_sector, detalle) VALUES ('MZA 1','MZA 1');
insert into sector(code_sector, detalle) VALUES ('MZA 2','MZA 2');
insert into sector(code_sector, detalle) VALUES ('MZA 3','MZA 3');

insert into tipo_servicio(detalle_servicio, hora_inicio, hora_fin)
            VALUES ('CAPILLA SIGTINA','09:30:00','18:00:00');

alter table usuario
    add constraint rel_rol_usuario foreign key usuario (fk_id_rol) references rol (id_rol);
alter table departamento
    add constraint rel_tipo_departamento_departamento foreign key departamento (fk_id_tipo_departamento)
        references tipo_departamento (id_tipo_departamento);
alter table vehiculo
    add constraint rel_vehiculo_usuario foreign key vehiculo (fk_email_usuario) references usuario (email_usuario);
alter table cuenta_bancaria
    add constraint rel_cuenta_bancaria_banco foreign key cuenta_bancaria (fk_banco) references banco (id_banco);
alter table cuenta_bancaria
    add constraint rel_cuenta_bancaria_usuario foreign key cuenta_bancaria (fk_email_usuario) references usuario (email_usuario);
alter table pago_departamento
    add constraint rel_pago_departamento_tipo_pago foreign key pago_departamento (fk_tipo_pago)
        references tipo_pago (id_tipo_pago);
alter table pago_departamento
    add constraint rel_pago_departamento_departamento foreign key pago_departamento (fk_code_departamento)
        references departamento (code_departamento);
alter table usuario_departamento
    add constraint rel_usuario_departamento foreign key usuario_departamento (fk_code_departamento)
        references departamento (code_departamento);
alter table usuario_departamento
    add constraint rel_usuario_departamento_usuario foreign key usuario_departamento (fk_email_usuario)
        references usuario (email_usuario);

alter table departamento
    add column actual_usuario_arrendador varchar(250);
alter table departamento
    add column fecha_arrendado datetime;

alter table soporte
    add constraint rel_soporte_tipo_soporte foreign key soporte (fk_tipo_soporte) references tipo_soporte (id_tipo_soporte);
alter table soporte
    add constraint rel_soporte_usuario_emisor foreign key usuario (usuario_emisor_ticket) references usuario (email_usuario);

alter table arrendamiento
    add constraint rel_usuario_arrendamiento foreign key arrendamiento (fk_email_usuario) references usuario (email_usuario);
alter table arrendamiento
    add constraint rel_departamento_arrendamiento foreign key arrendamiento (fk_code_departamento) references departamento (code_departamento);

alter table pago_departamento add column detalle_comprobante longtext;

alter table departamento add column fk_sector char(10) default 'MZA 1';
alter table departamento add constraint sector_departamento_ foreign key departamento(fk_sector) references sector(code_sector);


alter table pago_rubro add column detalle longtext;
alter table pago_rubro add column motivo longtext;

alter table pago_rubro add constraint rel_pago_rubro_rubro foreign key pago_rubro(fk_id_rubro) references rubro(id_rubro);
alter table pago_rubro add constraint rel_pago_rubro_departamento foreign key departamento(fk_code_departamento) references departamento(code_departamento);

alter table reserva_servicio add column fechaReserva date not null;
alter table reserva_servicio add foreign key reserva_servicio(fk_id_tipo_servicio) references tipo_servicio(id_tipo_servicio);
alter table reserva_servicio add constraint rel_fk_email_usuario_reserva foreign key reserva_servicio(fk_email_usuario) references usuario(email_usuario);

DELIMITER //
CREATE TRIGGER despues_de_insertar_arrendamiento
    AFTER INSERT
    ON arrendamiento
    FOR EACH ROW
BEGIN

    update departamento
    set estado                    = 2,
        actual_usuario_arrendador = new.fk_email_usuario,
        fecha_arrendado           = new.fecha_arrendamiento
    where code_departamento = new.fk_code_departamento;
END;
//
DELIMITER ;


DELIMITER //
CREATE EVENT IF NOT EXISTS evento_genera_deuda_arriendo
    ON SCHEDULE EVERY 1 DAY STARTS NOW() + INTERVAL 1 DAY
    DO
    BEGIN
        SET lc_time_names = 'es_ES';

        INSERT INTO pago_departamento (fecha_creacion, motivo, fk_code_departamento, fk_tipo_pago,fk_email_usuario, estado)
        SELECT NOW()                                                                             AS fecha_creacion,
               UPPER(CONCAT('PAGO MENSUAL CORRESPONDIENTE AL MES DE ', MONTHNAME(date(A.fecha_pago)))) AS motivo,
               A.fk_code_departamento                                                            AS fk_code_departamento,
               A.fk_email_usuario as fk_email_usuario,
               4                                                                                 AS fk_tipo_pago,
               1                                                                                 AS estado
        FROM arrendamiento AS A
                 INNER JOIN
             departamento AS D ON A.fk_code_departamento = D.code_departamento
        WHERE A.estado = 1
          AND DATE(fecha_pago) =  DATE(NOW());

    END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_estado_departamento AFTER UPDATE ON arrendamiento
FOR EACH ROW
BEGIN
    if OLD.estado != new.estado then
        if new.estado in (0,2) then
            update departamento set estado = 1,fecha_arrendado=null,actual_usuario_arrendador = null where code_departamento = new.fk_code_departamento;
        end if;
    end if;
END;
//
DELIMITER ;


DELIMITER //
CREATE TRIGGER after_insert_soporte
AFTER INSERT ON soporte
FOR EACH ROW
BEGIN
    if url_img = 'null' then
        update soporte set url_img = null where id_soporte = new.id_soporte;
    end if;

    if url_archivo = 'null' then
        update soporte set url_archivo = null where id_soporte = new.id_soporte;
    end if;


END;
//
DELIMITER ;

DELIMITER //


CREATE TRIGGER DespuesDelInsert
BEFORE INSERT ON pago_rubro
FOR EACH ROW
BEGIN
    SET NEW.fk_email_usuario = (SELECT D.actual_usuario_arrendador FROM departamento AS D WHERE D.code_departamento = NEW.fk_code_departamento LIMIT 1);
    -- update pago_rubro set fk_email_usuario = (select D.actual_usuario_arrendador from departamento as D where D.code_departamento = new.fk_code_departamento limit 1);
END //

DELIMITER ;


DELIMITER //


CREATE TRIGGER DespuesDelInsertPDEPA
BEFORE INSERT ON pago_departamento
FOR EACH ROW
BEGIN
    SET NEW.fk_email_usuario = (SELECT D.actual_usuario_arrendador FROM departamento AS D WHERE D.code_departamento = NEW.fk_code_departamento LIMIT 1);
    update arrendamiento set fecha_pago = DATE_ADD(fecha_pago,interval 1 MONTH ) where fk_code_departamento = new.fk_code_departamento
                             and fk_email_usuario = (SELECT D.actual_usuario_arrendador FROM departamento AS D WHERE D.code_departamento = NEW.fk_code_departamento LIMIT 1);
END //

DELIMITER ;

/***********************************************************************/
use gipac;
select count(*) from reserva_servicio where estado_reserva = 2;