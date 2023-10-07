drop schema cccat12 cascade;
create schema cccat12;

create table cccat12.passenger (
    passenger_id uuid primary key,
    name text,
    email text,
    document text
);

--delete from cccat12.passenger;

create table cccat12.driver (
    driver_id uuid primary key,
    name text,
    email text,
    document text,
    car_plate text
);
