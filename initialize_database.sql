CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS clients (
    client_id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    name VARCHAR(128) NOT NULL UNIQUE,
    domain VARCHAR(256) NULL UNIQUE,
    creation_date DATE NOT NULL DEFAULT NOW()::DATE,
    expiration_date DATE NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    client_id uuid NOT NULL REFERENCES clients (client_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(256) NULL,
    first_name VARCHAR(256) NOT NULL DEFAULT '',
    last_name VARCHAR(256) NOT NULL DEFAULT '',
    email VARCHAR(256) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    creation_date DATE NOT NULL DEFAULT NOW()::DATE,
    modification_timestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
    role_id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    client_id uuid NOT NULL REFERENCES clients (client_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
    permission_id uuid NOT NULL DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
    platform VARCHAR(16) NOT NULL,
    domain VARCHAR(32) NOT NULL,
    action VARCHAR(32) NOT NULL,
    summary VARCHAR(256) NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id uuid NOT NULL REFERENCES roles (role_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    permission_id uuid NOT NULL REFERENCES permissions (permission_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE user_permissions (
    user_id uuid NOT NULL REFERENCES users (user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    permission_id uuid NOT NULL REFERENCES permissions (permission_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    is_allowed BOOLEAN NOT NULL DEFAULT TRUE
);
