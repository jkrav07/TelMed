CREATE DATABSE TelMed;

DROP TABLE IF EXISTS Timeslots;
CREATE TABLE Timeslots (
  Timeslot_id serial PRIMARY KEY,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL
);

DROP TABLE IF EXISTS Providers;
CREATE TABLE Providers (
  Provider_id serial PRIMARY KEY,
  provider_license VARCHAR(60) NOT NULL,
  provider_name VARCHAR(60) NOT NULL,
  price INTEGER NOT NULL
);

ALTER TABLE Providers
	ADD provider_photo text;

ALTER TABLE Providers
	ADD provider_email text;

DROP TABLE IF EXISTS Patients;
CREATE TABLE Patients (
  Patient_id serial PRIMARY KEY,
  patient_name VARCHAR(60) NOT NULL,
  patient_email VARCHAR(60) NOT NULL,
);

DROP TABLE IF EXISTS Appointment;
CREATE TABLE Appointment (
  Appointment_id serial PRIMARY KEY,
  AppointmentTimeslot_id INTEGER NOT NULL,
  Appointment_date DATE,
  Patient_id INTEGER NOT NULL,
  Provider_id INTEGER NOT NULL,
  symptoms VARCHAR(1000) NOT NULL,

  FOREIGN KEY (AppointmentTimeslot_id)
    REFERENCES Timeslots (Timeslot_id)
  FOREIGN KEY (Patient_id)
    REFERENCES Patients (Patient_id)
  FOREIGN KEY (Provider_id)
    REFERENCES Providers (Provider_id)
);