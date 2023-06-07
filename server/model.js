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
    VALUES ($1, $2, $3, $4, $5)`
    return db.query(query1, args)
};

model.retrieveTimeslots = () => {
  //const args = [];
  let query = `
  SELECT * FROM Timeslots`
  return db.query(query)

};


model.retrieveMetaReviews = (productId) => {
  const args = [productId];
  const query1 = `
  SELECT rating, COUNT(Review_Id)
  FROM Reviews
  WHERE Product_Id=$1
  GROUP BY rating;`;
  const query2 = `
  SELECT recommend, COUNT(Review_Id)
  FROM Reviews
  WHERE Product_Id=$1
  GROUP BY recommend;`;
  const query3 = `
  SELECT characteristic_name, c.Characteristics_id, AVG(characteristic_value)
  FROM ReviewCharacteristics rc
  JOIN Characteristics c ON rc.Characteristics_id=c.Characteristics_id
  WHERE c.Product_Id=$1
  GROUP BY characteristic_name, c.Characteristics_id`

  let arr = [
    db.query(query1, args),
    db.query(query2, args),
    db.query(query3, args)
  ]
  return Promise.all(arr);
};

model.postReview = ( {product_id, rating, summary, body, recommend, name, email, photos, characteristics} ) => {

  return db.tx(async t => {

    const args1 = [product_id, rating, summary, body, recommend, '', new Date(), name, email, 0, false];
    const query1 = `
    INSERT INTO Reviews (Product_id, rating, summary, body, recommend, response, date, reviewer_name, reviewer_email, helpfulness, reported)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING Review_id`;
    const reviewId = await t.one(query1, args1, row => row.review_id);

    const query2 = `
    INSERT INTO ReviewPhotos (Review_id, reviewPhoto_url)
    VALUES ($1, $2)`;
    await photos.forEach(async url => {
      const args2 = [reviewId, url];
      await t.none(query2, args2);
    });

    const query3 = `
    INSERT INTO ReviewCharacteristics (Review_Id, Characteristics_id, characteristic_value)
    VALUES ($1, $2, $3)`;
    let characteristicsArr = [];
    for (let prop in characteristics) {
      characteristicsArr.push([reviewId, prop, characteristics[prop]]);
    }
    await characteristicsArr.forEach(async args3 => {
      await t.none(query3, args3);
    });
  });
};


model.markReviewHelpful = (reviewId) => {
  const args = [reviewId];
  const query = `
  UPDATE Reviews
  SET helpfulness = helpfulness + 1
  WHERE Review_Id = $1`
  return db
    .query(query, args)
    .then(res => {
      console.log(res); return res;
    })
    .catch(err => {
      console.log('ERROR UPDATING REVIEW RECORD FOR HELPFUL FIELD:', err);
    })
}

model.markReviewReported = (reviewId) => {
  const args = [reviewId];
  const query = `
  UPDATE Reviews
  SET reported = true
  WHERE Review_Id = $1`;
  return db
    .query(query, args)
    .then(res => {
      console.log(res); return res;
    })
    .catch(err => {
      console.log('ERROR UPDATING REVIEW RECORD FOR REPORTED FIELD:', err);
    })
}


module.exports = model;
