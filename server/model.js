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
  SELECT Provider_id, provider_name, price, provider_photo FROM Providers p
  WHERE NOT EXISTS (
	  SELECT Appointment_id FROM Appointment a
		  WHERE Appointment_date=$1
  			AND AppointmentTimeslot_id=$2
			AND p.Provider_id = a.Provider_id
	  )`;

  return db.query(query, [date, timeslotId]);
};

model.findProviderName = (providerId) => {
  let query = `
  SELECT provider_name from Providers
  WHERE Provider_id=$1`;
  return db.query(query, [providerId]);
}

model.findTimeslotName = (timeslotId) => {
  let query = `
  SELECT startTime, endTime from Timeslots
  WHERE Timeslot_id=$1`;
  return db.query(query, [timeslotId]);
}

model.retrieiveProviderInfo = (providerEmail) => {
  const query = `
  SELECT * from Providers p
  JOIN Appointment a
  ON p.Provider_id=a.Provider_id
  JOIN Timeslots t
  ON t.Timeslot_id=a.AppointmentTimeslot_id
  JOIN Patients s
  ON s.patient_id=a.patient_id
  WHERE p.provider_email='j.krav07@gmail.com'
  AND appointment_date>CURRENT_DATE
  ORDER BY appointment_date ASC, appointmentTimeslot_id ASC`
  return db.query(query, [providerEmail]);
}

model.fetchApptInfo = (apptId) => {
  const query = `
    Select * FROM Appointment a
    JOIN Providers p
    ON p.Provider_id=a.Provider_id
    JOIN Timeslots t
    ON t.Timeslot_id=a.AppointmentTimeslot_id
    JOIN Patients s
    ON s.patient_id=a.patient_id
    WHERE a.appointment_id=$1;`
  return db.query(query, [apptId])
}

model.removeAppt = (apptId) => {
  const query = `
    DELETE FROM Appointment
    WHERE appointment_id=$1;`
  return db.query(query, [apptId])
}

module.exports = model;
