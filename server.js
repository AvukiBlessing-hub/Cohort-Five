// app.js - Node.js Express Server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Mock database (replace with actual database)
const applications = [];

// Validation function
function validateForm(data) {
  const errors = {};

  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'First Name is required';
  }
  if (!data.lastName || data.lastName.trim() === '') {
    errors.lastName = 'Last Name is required';
  }
  if (!data.course || data.course === '-- Select --') {
    errors.course = 'Course is required';
  }
  if (!data.entryScheme || data.entryScheme === '-- Select --') {
    errors.entryScheme = 'Entry Scheme is required';
  }
  if (!data.intake || data.intake === '-- Select --') {
    errors.intake = 'Intake is required';
  }
  if (!data.sponsorship || data.sponsorship === '-- Select --') {
    errors.sponsorship = 'Sponsorship is required';
  }
  if (!data.gender) {
    errors.gender = 'Gender is required';
  }
  if (!data.dateOfBirth || data.dateOfBirth.trim() === '') {
    errors.dateOfBirth = 'Date of Birth is required';
  } else if (!/^\d{4}\/\d{2}\/\d{2}$/.test(data.dateOfBirth)) {
    errors.dateOfBirth = 'Date must be in YYYY/MM/DD format';
  }
  if (!data.residence || data.residence.trim() === '') {
    errors.residence = 'Residence is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

// GET route - Display form
app.get('/', (req, res) => {
  res.render('application', { errors: null, data: {} });
});

// POST route - Handle form submission
app.post('/submit-application', (req, res) => {
  const formData = req.body;
  const errors = validateForm(formData);

  if (errors) {
    return res.render('application', { errors, data: formData });
  }

  // Save to mock database
  applications.push({
    id: applications.length + 1,
    ...formData,
    submittedAt: new Date()
  });

  res.render('success', { data: formData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});