CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  email VARCHAR(512),
  hash VARCHAR(256),
  role VARCHAR(32) CHECK (role IN(
    'admin',
    'secretary',
    'client'
  )) DEFAULT 'client',
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX user_email_idx ON users (email);

CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32)
);

CREATE TABLE breeds (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32)
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) NOT NULL,
  pet_type_id INTEGER REFERENCES pet_types(id) NOT NULL,
  breed_id INTEGER REFERENCES breeds(id) NOT NULL,
  name VARCHAR(32),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
