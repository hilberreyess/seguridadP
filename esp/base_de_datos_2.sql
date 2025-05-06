CREATE SCHEMA IF NOT EXISTS empresas_seguridad_privada;

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_municipios (
  id_municipio smallint NOT NULL PRIMARY KEY,
  CLAVE_MUNICIPIO varchar(500) NOT NULL,
  id_entidad smallint NOT NULL,
  municipio varchar(500),
  id_region smallint NOT NULL
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_municipios (id_municipio);
CREATE INDEX empresas_seguridad_privada_fk_cat_municipios_cat_regiones1_idx ON empresas_seguridad_privada.cat_municipios (id_region);
CREATE INDEX empresas_seguridad_privada_fk_cat_municipios_cat_entidades1_idx ON empresas_seguridad_privada.cat_municipios (id_entidad);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_usuario_estatus (
  id_estatus smallint NOT NULL PRIMARY KEY,
  estatus varchar(500) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_usuario_estatus (id_estatus);
CREATE UNIQUE INDEX empresas_seguridad_privada_estatus_UNIQUE ON empresas_seguridad_privada.cat_usuario_estatus (estatus);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_cliente_tipos (
  id_tipo smallint NOT NULL PRIMARY KEY,
  tipo varchar(500) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_cliente_tipos (id_tipo);
CREATE UNIQUE INDEX empresas_seguridad_privada_tipo_UNIQUE ON empresas_seguridad_privada.cat_cliente_tipos (tipo);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_arma_modelos (
  id_modelo smallint NOT NULL PRIMARY KEY,
  modelo varchar(500),
  C_CALIBRE varchar(500),
  C_MODELO varchar(500) NOT NULL,
  C_MODELO_SN varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_arma_modelos (id_modelo);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_estado_civil (
  id_estado_civil smallint NOT NULL PRIMARY KEY,
  estado_civil varchar(500) NOT NULL UNIQUE,
  CLAVE_E_CIVIL varchar(500) NOT NULL,
  DESCRIPCION varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_estado_civil (id_estado_civil);
CREATE UNIQUE INDEX empresas_seguridad_privada_estado_civil_UNIQUE ON empresas_seguridad_privada.cat_estado_civil (estado_civil);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_empresas (
  id_empresa int NOT NULL PRIMARY KEY,
  id_tipo_permiso smallint NOT NULL,
  tipo_permiso int NOT NULL DEFAULT 1,
  empresa varchar(500) NOT NULL,
  rfc varchar(500),
  domicilio varchar(500),
  representante varchar(500),
  numero_registro varchar(500),
  telefono varchar(500),
  correo varchar(500),
  fecha_autoriza date DEFAULT NULL,
  fecha_vence date DEFAULT NULL,
  cedula_registro varchar(500),
  numero_expediente varchar(500),
  clave varchar(500) NOT NULL,
  estatus int DEFAULT 1,
  sfa varchar(500),
  folio varchar(500),
  caracteristica varchar(500),
  n_registro_f bigint,
  id_vigencia smallint NOT NULL,
  observaciones varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_empresas (id_empresa);
CREATE INDEX esp_empresas_tipo_permiso_idx ON empresas_seguridad_privada.esp_empresas (id_tipo_permiso);
CREATE INDEX esp_empresas_vigencia_idx ON empresas_seguridad_privada.esp_empresas (id_vigencia);


CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_equipo_fornituras (
  id_fornitura int NOT NULL PRIMARY KEY,
  id_empresa int NOT NULL,
  esposas enum('NO', 'YES') DEFAULT 'NO',
  tolete enum('NO', 'YES') DEFAULT 'NO',
  pr24 enum('NO', 'YES') DEFAULT 'NO',
  baston enum('NO', 'YES') DEFAULT 'NO',
  gas_lacrimogeno enum('NO', 'YES') DEFAULT 'NO',
  otros enum('NO', 'YES') DEFAULT 'NO',
  otros_implementos varchar(500),
  eliminado enum('NO', 'YES') DEFAULT 'NO'
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_equipo_fornituras (id_fornitura);
CREATE INDEX esp_equipo_fornituras_empresa_idx ON empresas_seguridad_privada.esp_equipo_fornituras (id_empresa);


CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.sistema_usuarios (
  id_usuario int NOT NULL PRIMARY KEY,
  id_estatus smallint NOT NULL DEFAULT 1,
  bloqueado enum('NO', 'YES') NOT NULL DEFAULT 'NO',
  no_empleado varchar(500),
  nombre_completo varchar(500),
  user_name varchar(500) NOT NULL,
  user_password varchar(500) NOT NULL,
  user_email varchar(500),
  user_code varchar(500),
  user_phone varchar(500),
  user_photo varchar(500) DEFAULT 'user.png',
  login_fail tinyint NOT NULL DEFAULT 0,
  max_login_fail tinyint NOT NULL DEFAULT 10,
  fecha_hora_registro timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_registro varchar(500),
  fecha_hora_edicion datetime DEFAULT NULL,
  usuario_edicion varchar(500),
  default_password varchar(500),
  fecha_hora_password datetime DEFAULT NULL,
  fecha_hora_baja datetime DEFAULT NULL,
  usuario_baja varchar(500),
  observaciones varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.sistema_usuarios (id_usuario);
CREATE INDEX sistema_usuarios_estatus_idx ON empresas_seguridad_privada.sistema_usuarios (id_estatus);
CREATE INDEX empresas_seguridad_privada_user_name ON empresas_seguridad_privada.sistema_usuarios (user_name);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_regiones (
  id_region smallint NOT NULL PRIMARY KEY,
  CLAVE_REGION varchar(500) NOT NULL UNIQUE,
  region varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_regiones (id_region);
CREATE UNIQUE INDEX empresas_seguridad_privada_CLAVE_REGION_UNIQUE ON empresas_seguridad_privada.cat_regiones (CLAVE_REGION);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_entidades (
  id_entidad smallint NOT NULL PRIMARY KEY,
  id_pais smallint NOT NULL,
  entidad varchar(500) NOT NULL,
  abreviatura varchar(500) NOT NULL,
  CLAVE_ENTIDAD varchar(500) NOT NULL
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_entidades (id_entidad);
CREATE INDEX empresas_seguridad_privada_fk_cat_entidades_cat_paises1_idx ON empresas_seguridad_privada.cat_entidades (id_pais);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_equipo_uniforme (
  id_uniforme int NOT NULL PRIMARY KEY,
  id_empresa int NOT NULL,
  pantalon enum('NO', 'YES') DEFAULT 'NO',
  camisa enum('NO', 'YES') DEFAULT 'NO',
  camisola enum('NO', 'YES') DEFAULT 'NO',
  corbata enum('NO', 'YES') DEFAULT 'NO',
  chamarra enum('NO', 'YES') DEFAULT 'NO',
  saco enum('NO', 'YES') DEFAULT 'NO',
  gorra enum('NO', 'YES') DEFAULT 'NO',
  casco_proteccion enum('NO', 'YES') DEFAULT 'NO',
  chaleco_antibalas enum('NO', 'YES') DEFAULT 'NO',
  otros enum('NO', 'YES') DEFAULT 'NO',
  otros_eccesorios varchar(500),
  eliminado enum('NO', 'YES') DEFAULT 'NO'
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_equipo_uniforme (id_uniforme);
CREATE INDEX esp_uniforme_empresa_idx ON empresas_seguridad_privada.esp_equipo_uniforme (id_empresa);


CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_empresas_has_esp_clientes (
  id_empresa int NOT NULL,
  id_cliente int NOT NULL,
  PRIMARY KEY (id_empresa, id_cliente)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_empresas_has_esp_clientes (id_empresa, id_cliente);
CREATE INDEX esp_empresas_clientes_cliente_idx ON empresas_seguridad_privada.esp_empresas_has_esp_clientes (id_cliente);
CREATE INDEX esp_empresas_clientes_empresa_idx ON empresas_seguridad_privada.esp_empresas_has_esp_clientes (id_empresa);


CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_empresa_vigencia (
  id_vigencia smallint NOT NULL PRIMARY KEY,
  vigencia varchar(500) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_empresa_vigencia (id_vigencia);
CREATE UNIQUE INDEX empresas_seguridad_privada_vigencia_UNIQUE ON empresas_seguridad_privada.cat_empresa_vigencia (vigencia);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_personal (
  id_personal int NOT NULL PRIMARY KEY,
  no_empleado varchar(500) NOT NULL UNIQUE,
  es_empleado varchar(500),
  nombre varchar(500),
  apellido_paterno varchar(500),
  apellido_materno varchar(500),
  fecha_nacimiento date DEFAULT NULL,
  curp varchar(500),
  cuip varchar(500),
  rfc varchar(500),
  sexo varchar(500),
  cartilla_militar varchar(500),
  licencia_conducir varchar(500),
  pasaporte varchar(500),
  no_seguridad_social varchar(500),
  naturalizado enum('NO', 'YES') DEFAULT 'NO',
  carta_de_naturalizacion varchar(500),
  id_estado_civil smallint NOT NULL,
  TIPO_SANGRE varchar(500),
  FACTOR_RH varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_personal (id_personal);
CREATE UNIQUE INDEX empresas_seguridad_privada_N_EMPLEADO ON empresas_seguridad_privada.esp_personal (no_empleado);
CREATE INDEX empresas_seguridad_privada_E_EMPLEADO ON empresas_seguridad_privada.esp_personal (es_empleado);
CREATE INDEX esp_personal_estado_civil_idx ON empresas_seguridad_privada.esp_personal (id_estado_civil);
CREATE INDEX esp_personal_sexo_idx ON empresas_seguridad_privada.esp_personal (sexo);


CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_arma_calibres (
  id_calibre smallint NOT NULL PRIMARY KEY,
  calibre varchar(500),
  C_CALIBRE varchar(500) NOT NULL,
  C_CALIBRE_SN varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_arma_calibres (id_calibre);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_equipo_electronico (
  id_electronico int NOT NULL PRIMARY KEY,
  id_empresa int NOT NULL,
  marca varchar(500),
  modelo varchar(500),
  eliminado enum('NO', 'YES') DEFAULT 'NO'
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_equipo_electronico (id_electronico);
CREATE INDEX esp_equipo_electronico_empresa_idx ON empresas_seguridad_privada.esp_equipo_electronico (id_empresa);


CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_clientes (
  id_cliente int NOT NULL PRIMARY KEY,
  nombre varchar(500) NOT NULL,
  telefono varchar(500),
  domicilio varchar(500),
  e_mail varchar(500),
  contacto varchar(500),
  id_tipo smallint NOT NULL,
  estatus int NOT NULL DEFAULT 1,
  rfc varchar(500),
  ciudad varchar(500) NOT NULL,
  id_municipio smallint NOT NULL,
  id_entidad smallint NOT NULL
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_clientes (id_cliente);
CREATE INDEX empresas_seguridad_privada_fk_sp_clientes_cat_cliente_tipos1_idx ON empresas_seguridad_privada.esp_clientes (id_tipo);
CREATE INDEX empresas_seguridad_privada_fk_sp_clientes_cat_entidades1_idx ON empresas_seguridad_privada.esp_clientes (id_entidad);
CREATE INDEX empresas_seguridad_privada_fk_sp_clientes_cat_municipios1_idx ON empresas_seguridad_privada.esp_clientes (id_municipio);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_armas (
  id_arma int NOT NULL PRIMARY KEY,
  id_empresa int NOT NULL,
  id_tipo smallint NOT NULL,
  id_modelo smallint NOT NULL,
  id_calibre smallint NOT NULL,
  matricula varchar(500) NOT NULL UNIQUE,
  folio varchar(500) NOT NULL,
  municiones varchar(500),
  estriamiento varchar(500),
  estatus int NOT NULL DEFAULT 1,
  fecha_hora_captura timestamp DEFAULT CURRENT_TIMESTAMP,
  usuario_captura varchar(500),
  fecha_hora_edita timestamp DEFAULT CURRENT_TIMESTAMP,
  usuario_edita varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_armas (id_arma);
CREATE UNIQUE INDEX empresas_seguridad_privada_matricula_UNIQUE ON empresas_seguridad_privada.esp_armas (matricula);
CREATE INDEX empresas_seguridad_privada_fk_sp_armas_cat_arma_tipos1_idx ON empresas_seguridad_privada.esp_armas (id_tipo);
CREATE INDEX empresas_seguridad_privada_fk_sp_armas_cat_arma_calibres1_idx ON empresas_seguridad_privada.esp_armas (id_calibre);
CREATE INDEX empresas_seguridad_privada_fk_sp_armas_cat_arma_modelos1_idx ON empresas_seguridad_privada.esp_armas (id_modelo);
CREATE INDEX empresas_seguridad_privada_fk_esp_armas_esp_empresas1_idx ON empresas_seguridad_privada.esp_armas (id_empresa);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_paises (
  id_pais smallint NOT NULL PRIMARY KEY,
  CLAVE_PAIS varchar(500) NOT NULL,
  pais varchar(500) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_paises (id_pais);
CREATE UNIQUE INDEX empresas_seguridad_privada_pais_UNIQUE ON empresas_seguridad_privada.cat_paises (pais);
CREATE INDEX empresas_seguridad_privada_CLAVE_PAIS ON empresas_seguridad_privada.cat_paises (CLAVE_PAIS);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_empresa_tipo_permiso (
  id_tipo_permiso smallint NOT NULL PRIMARY KEY,
  tipo_permiso varchar(500) NOT NULL UNIQUE
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_empresa_tipo_permiso (id_tipo_permiso);
CREATE UNIQUE INDEX empresas_seguridad_privada_tipo_permiso ON empresas_seguridad_privada.cat_empresa_tipo_permiso (tipo_permiso);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.cat_arma_tipos (
  id_tipo smallint NOT NULL PRIMARY KEY,
  tipo varchar(500),
  C_TIPO varchar(500) NOT NULL
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.cat_arma_tipos (id_tipo);

CREATE TABLE IF NOT EXISTS empresas_seguridad_privada.esp_personal_domicilios (
  id_domicilio int NOT NULL PRIMARY KEY,
  id_personal int NOT NULL,
  id_municipio smallint NOT NULL,
  ciudad_localidad varchar(500),
  codigo_postal varchar(500),
  colonia varchar(500),
  calle varchar(500),
  no_exterior varchar(500),
  no_interior varchar(500),
  entre_calle varchar(500),
  y_la_calle varchar(500),
  telefono varchar(500),
  telefono_movil varchar(500),
  eliminado enum('NO', 'YES') DEFAULT 'NO',
  fecha_hora_registro timestamp NULL,
  usuario_registro varchar(500)
);

CREATE UNIQUE INDEX empresas_seguridad_privada_PRIMARY ON empresas_seguridad_privada.esp_personal_domicilios (id_domicilio);
CREATE INDEX esp_personal_domicilios_personal_idx ON empresas_seguridad_privada.esp_personal_domicilios (id_personal);
CREATE INDEX esp_personal_domicilios_municipio_idx ON empresas_seguridad_privada.esp_personal_domicilios (id_municipio);

ALTER TABLE empresas_seguridad_privada.cat_entidades ADD CONSTRAINT fk_cat_entidades_cat_paises1 FOREIGN KEY (id_pais) REFERENCES empresas_seguridad_privada.cat_paises (id_pais);
ALTER TABLE empresas_seguridad_privada.cat_municipios ADD CONSTRAINT fk_cat_municipios_cat_regiones1 FOREIGN KEY (id_region) REFERENCES empresas_seguridad_privada.cat_regiones (id_region);
ALTER TABLE empresas_seguridad_privada.esp_armas ADD CONSTRAINT fk_esp_armas_esp_empresas1 FOREIGN KEY (id_empresa) REFERENCES empresas_seguridad_privada.esp_empresas (id_empresa);
ALTER TABLE empresas_seguridad_privada.esp_empresas ADD CONSTRAINT fk_esp_empresas_cat_empresa_tipo_permiso1 FOREIGN KEY (id_tipo_permiso) REFERENCES empresas_seguridad_privada.cat_empresa_tipo_permiso (id_tipo_permiso);
ALTER TABLE empresas_seguridad_privada.esp_empresas ADD CONSTRAINT fk_esp_empresas_cat_empresa_vigencia1 FOREIGN KEY (id_vigencia) REFERENCES empresas_seguridad_privada.cat_empresa_vigencia (id_vigencia);
ALTER TABLE empresas_seguridad_privada.esp_empresas_has_esp_clientes ADD CONSTRAINT fk_esp_empresas_has_esp_clientes_esp_clientes1 FOREIGN KEY (id_cliente) REFERENCES empresas_seguridad_privada.esp_clientes (id_cliente);
ALTER TABLE empresas_seguridad_privada.esp_empresas_has_esp_clientes ADD CONSTRAINT fk_esp_empresas_has_esp_clientes_esp_empresas1 FOREIGN KEY (id_empresa) REFERENCES empresas_seguridad_privada.esp_empresas (id_empresa);
ALTER TABLE empresas_seguridad_privada.esp_equipo_electronico ADD CONSTRAINT fk_esp_equipo_electronico_esp_empresas1 FOREIGN KEY (id_empresa) REFERENCES empresas_seguridad_privada.esp_empresas (id_empresa);
ALTER TABLE empresas_seguridad_privada.esp_equipo_fornituras ADD CONSTRAINT fk_esp_equipo_fornituras_esp_empresas1 FOREIGN KEY (id_empresa) REFERENCES empresas_seguridad_privada.esp_empresas (id_empresa);
ALTER TABLE empresas_seguridad_privada.esp_equipo_uniforme ADD CONSTRAINT fk_esp_equipo_uniforme_esp_empresas1 FOREIGN KEY (id_empresa) REFERENCES empresas_seguridad_privada.esp_empresas (id_empresa);
ALTER TABLE empresas_seguridad_privada.esp_personal ADD CONSTRAINT fk_esp_personal_cat_estado_civil1 FOREIGN KEY (id_estado_civil) REFERENCES empresas_seguridad_privada.cat_estado_civil (id_estado_civil);
ALTER TABLE empresas_seguridad_privada.esp_personal_domicilios ADD CONSTRAINT fk_esp_personal_domicilios_cat_municipios1 FOREIGN KEY (id_municipio) REFERENCES empresas_seguridad_privada.cat_municipios (id_municipio);
ALTER TABLE empresas_seguridad_privada.esp_personal_domicilios ADD CONSTRAINT fk_esp_personal_domicilios_esp_personal1 FOREIGN KEY (id_personal) REFERENCES empresas_seguridad_privada.esp_personal (id_personal);
ALTER TABLE empresas_seguridad_privada.sistema_usuarios ADD CONSTRAINT fk_sistema_usuarios_cat_usuario_estatus1 FOREIGN KEY (id_estatus) REFERENCES empresas_seguridad_privada.cat_usuario_estatus (id_estatus);
ALTER TABLE empresas_seguridad_privada.esp_armas ADD CONSTRAINT fk_sp_armas_cat_arma_calibres1 FOREIGN KEY (id_calibre) REFERENCES empresas_seguridad_privada.cat_arma_calibres (id_calibre);
ALTER TABLE empresas_seguridad_privada.esp_armas ADD CONSTRAINT fk_sp_armas_cat_arma_modelos1 FOREIGN KEY (id_modelo) REFERENCES empresas_seguridad_privada.cat_arma_modelos (id_modelo);
ALTER TABLE empresas_seguridad_privada.esp_armas ADD CONSTRAINT fk_sp_armas_cat_arma_tipos1 FOREIGN KEY (id_tipo) REFERENCES empresas_seguridad_privada.cat_arma_tipos (id_tipo);
ALTER TABLE empresas_seguridad_privada.esp_clientes ADD CONSTRAINT fk_sp_clientes_cat_cliente_tipos1 FOREIGN KEY (id_tipo) REFERENCES empresas_seguridad_privada.cat_cliente_tipos (id_tipo);
ALTER TABLE empresas_seguridad_privada.esp_clientes ADD CONSTRAINT fk_sp_clientes_cat_entidades1 FOREIGN KEY (id_entidad) REFERENCES empresas_seguridad_privada.cat_entidades (id_entidad);
ALTER TABLE empresas_seguridad_privada.esp_clientes ADD CONSTRAINT fk_sp_clientes_cat_municipios1 FOREIGN KEY (id_municipio) REFERENCES empresas_seguridad_privada.cat_municipios (id_municipio);
ALTER TABLE empresas_seguridad_privada.cat_entidades ADD CONSTRAINT cat_entidades_id_entidad_fk FOREIGN KEY (id_entidad) REFERENCES empresas_seguridad_privada.cat_municipios (id_entidad);