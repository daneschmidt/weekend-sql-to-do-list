CREATE TABLE "tasklist" (
    "id" SERIAL PRIMARY KEY,
    "task" varchar(250) not null,
    "complete" varchar(10) not null,
    "delete" varchar(10) not null
);