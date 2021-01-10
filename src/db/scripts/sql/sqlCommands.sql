CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(32),
  email VARCHAR(512),
  hash VARCHAR(256),
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX user_email_idx ON users (email);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32)
);

CREATE TABLE users_roles (
  user_id  INTEGER REFERENCES users(id) NOT NULL,
  role_id INTEGER REFERENCES roles(id) NOT NULL
);