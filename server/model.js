const db = require('./db')

const model = {};

model.findPatient = (patientName, patientEmail)   => {
  const args = [patientName, patientEmail];
  const query1 = `
    SELECT patient_name, patient_email, Patient_id FROM Patients
    WHERE patient_email=$2`
    return db.query(query1, args)
};

model.addPatient = (patientName, patientEmail)   => {
  const args = [patientName, patientEmail];
  const query1 = `
    INSERT INTO Patients (patient_name, patient_email)
    VALUES ($1, $2)
    RETURNING Patient_id`
    return db.query(query1, args)
};

model.addAppt = (date, timeslotId, patientId, providerId, symptoms)   => {
  const args = [date, timeslotId, patientId, providerId, symptoms];
  const query1 = `
    INSERT INTO Appointment (Appointment_date, AppointmentTimeslot_id, Patient_id,
      Provider_id, symptoms)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING Appointment_id`
    return db.query(query1, args)
};

model.retrieveTimeslots = () => {
  //const args = [];
  let query = `
  SELECT * FROM Timeslots`
  return db.query(query)

};

model.retrieveProviders = (date, timeslotId) => {

  let query = `
  SELECT Provider_id, provider_name, price FROM Providers p
  WHERE NOT EXISTS (
	  SELECT Appointment_id FROM Appointment a
		  WHERE Appointment_date=$1
  			AND AppointmentTimeslot_id=$2
			AND p.Provider_id = a.Provider_id
	  )`;

  return db.query(query, [date, timeslotId]);
}


module.exports = model;
