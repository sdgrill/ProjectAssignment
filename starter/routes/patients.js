var express = require('express');
var router = express.Router();
const Patient = require('../models/patient')

router.get('/create', async function(req, res, next) {
 
  let patientsD = await Patient.find();

  res.render('patients/create', {patientsData: patientsD });
});

router.post('/create', async function (req, res, next) {
  let newPatient = new Patient(
  {
    creatorId:req.body.creatorId,
    creatorName:req.body.creatorName,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    birthdate:req.body.birthdate,
    zipcode:req.body.zipcode,
    state:req.body.state,
    phoneNumber:req.body.phoneNumber,
    createDate:req.body.createDate,
    insuranceType:req.body.insuranceType,
    testType:req.body.testType,
    doctorService:req.body.doctorService,
    labName:req.body.labName,
    sampleStatus:req.body.sampleStatus
  }

  );
    
  try {
    await newPatient.save();
    console.log('Patient saved successfully!');
} catch (err) {
    console.error(err);
    // Handle the error appropriately, for example, send an error response
    res.status(500).send('Internal Server Error');
    return; // Make sure to return to prevent further execution
}
    res.redirect('/patients/details')
  
  });


router.get('/details', async function(req, res, next) {

    let patientsD = await Patient.find();

    res.render('patients/details', { patientsData: patientsD });
  
});

router.get('/delete', async function(req, res){
 let id = req.query._id;
 await Patient.findByIdAndDelete(id);
 res.redirect("/patients/details");
});
module.exports = router;
