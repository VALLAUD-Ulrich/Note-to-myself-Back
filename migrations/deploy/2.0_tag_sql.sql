-- Active: 1664437886799@@127.0.0.1@5432@note_to_my_self@public
BEGIN;

CREATE TABLE "suggested_tag_meal" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

CREATE TABLE "suggested_tag_restaurant" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE
);

END;