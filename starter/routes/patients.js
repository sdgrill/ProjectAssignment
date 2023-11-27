var express = require('express');
var router = express.Router();
const Patient = require('../models/patient')
const authMiddleware = require('../middleware/auth');

router.get('/create', authMiddleware.ensureAuthenticated, async function(req, res, next) {
 
  let patientsD = await Patient.find();

  res.render('patients/create', {patientsData: patientsD });
});

router.post('/create', authMiddleware.ensureAuthenticated, async function (req, res, next) {
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
    labName:req.body.labName,
    testType:req.body.testType,
    doctorService:req.body.doctorService,
    sampleStatus:req.body.sampleStatus,
    outstandingActionItems:req.body.outstandingActionItems,
    
    
  });
    
  try {
    await newPatient.save();
    console.log('Patient saved successfully!');
    res.redirect('/patients/details')
} catch (err) {
    console.error(err);
    // Handle the error appropriately, for example, send an error response
    res.status(500).send('Internal Server Error');
    return; // Make sure to return to prevent further execution
}
    
  
  });


router.get('/details', authMiddleware.ensureAuthenticated, async function(req, res, next) {
try{
    let patientsD = await Patient.find();
    res.render('patients/details', { patientsData: patientsD });
} catch (err){
  console.error(err);
  res.status(500).send('Internal Server Error');

}
});

router.get('/update', authMiddleware.ensureAuthenticated,  async function(req,res){
  let id = req.query._id;

  let patientsD = await Patient.findById(id);

  res.render('patients/edit', {patientsData: patientsD});
});




router.post('/update', authMiddleware.ensureAuthenticated,  async function(req,res){
  let id = req.body._id;

  await Patient.findOneAndUpdate({_id: id}, {
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
    labName:req.body.labName,
    testType:req.body.testType,
    doctorService:req.body.doctorService,
    sampleStatus:req.body.sampleStatus,
    outstandingActionItems:req.body.outstandingActionItems,
  });

  res.redirect('/patients/details');
});

router.get('/delete', authMiddleware.ensureAuthenticated, async function(req, res){
 let id = req.query._id;
 await Patient.findByIdAndDelete(id);
 res.redirect("/patients/details");
});
module.exports = router;
