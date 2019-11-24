--------NAME YOUR LOCAL DATABASE "open-doors"----------------

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(30) UNIQUE,
	"password" varchar
);

CREATE TABLE "shelter" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50),
	"location" VARCHAR(100),
	"phone" VARCHAR(15),
	"website" varchar(255),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"description" VARCHAR(500),
	"timestamp" timestamp with time zone
); 

CREATE TABLE "guest_type" (
	"id" SERIAL PRIMARY KEY,
	"type" varchar(30)
);

CREATE TABLE "shelter_guest_count" (
	"id" SERIAL PRIMARY KEY,
	"shelter_id" INT REFERENCES "shelter" ON DELETE CASCADE,
	"type_id" INT REFERENCES "guest_type" ON DELETE CASCADE,
	"count" integer DEFAULT 0,
	"capacity" integer
);

CREATE TABLE "hours" (
	"id" SERIAL PRIMARY KEY,
	"shelter_id" INT REFERENCES "shelter" ON DELETE CASCADE,
	"day" varchar(30),
	"open" varchar(20),
	"close" varchar(20)
);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tag" VARCHAR(30)
);

CREATE TABLE "shelter_tags" (
	"id" SERIAL PRIMARY KEY,
	"shelter_id" INT REFERENCES "shelter" ON DELETE CASCADE,
	"tag_id" INT REFERENCES "tags" ON DELETE CASCADE
);

INSERT INTO "tags" ("tag") VALUES 
('dinner'),('shower'),('laundry'),('employment'),('no sobriety requirement'),('savings program'),('recovery program'),('wheelchair accessible'),('computer lab'),('storage facilities'),('LGBTQ only'),('mental health support');


INSERT INTO "guest_type" ("type") VALUES 
('adult/male identified'),('adult/female identified'),('family'),('veteran'),('youth'),('nonspecific');
