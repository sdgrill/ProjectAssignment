var express = require('express');
var router = express.Router();
const Patient = require('../models/patient')
const authMiddleware = require('../middleware/auth');
const excel = require('exceljs');

router.get('/excel-export', async function (req,res,next){
const workbook = new excel.Workbook();
const worksheet = workbook.addWorksheet('Patient Data')

let patientsD = await Patient.find()

const commonColumns = [
 
  { header: 'FirstName', key: 'firstName', width: 15 },
  { header: 'LastName', key: 'lastName', width: 15 },
  { header: 'State', key: 'state', width: 10 },
  { header: 'Zipcode', key: 'zipcode', width: 15 },
  { header: 'Birth date', key: 'birthdate', width: 15 },
  { header: 'Phone Number', key: 'phoneNumber', width: 15 },
  { header: 'Lab Name', key: 'labName', width: 20 },
  { header: 'Doctor Service', key: 'doctorService', width: 15 },
  { header: 'Insurance Type', key: 'insuranceType', width: 15 },
  { header: 'Test Type', key: 'testType', width: 15 },
  { header: 'Sample Status', key: 'sampleStatus', width: 20 },
  
];

const userRole = req.user.role; // Assuming user role is stored in req.user
  const creatorColumns = (userRole !== 'dataEntrySpecialist')
    ? [
      { header: 'Creator ID', key: 'creatorId', width: 15 },
      { header: 'Creator Name', key: 'creatorName', width: 20 },
      { header: 'Create Date', key: 'createDate', width: 15 },
      { header: 'Outstanding Action Items', key: 'outstandingActionItems', width: 40 },
      { header: 'Quality Control Comments', key: 'qualityControlComments', width: 40 },
    ]
    : [];

worksheet.columns = [, ...creatorColumns, ...commonColumns]

worksheet.addRows(patientsD)

res.setHeader(
  'Content-Type',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );
  res.setHeader(
  'Content-Disposition',
  'attachment; filename=' + 'Patient Data.xlsx',
  );
  return workbook.xlsx.write(res).then(function() {
  res.status(200).end();
  });

});

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
    qcComments:req.body.qcComments,
    
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
    qcComments:req.body.qcComments,
  });

  res.redirect('/patients/details');
});

router.get('/delete', authMiddleware.ensureAuthenticated, async function(req, res){
 let id = req.query._id;
 await Patient.findByIdAndDelete(id);
 res.redirect("/patients/details");
});
module.exports = router;
