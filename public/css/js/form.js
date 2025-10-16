// public/validation.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateFormClient()) {
        form.submit();
      }
    });

    // Real-time validation on input
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });

      input.addEventListener('change', () => {
        validateField(input);
      });
    });
  }
});

function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();
  const fieldGroup = field.closest('.form-group');
  let isValid = true;
  let errorMsg = '';

  // Remove existing error message
  const existingError = fieldGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Validation logic
  switch (fieldName) {
    case 'firstName':
      if (fieldValue === '') {
        isValid = false;
        errorMsg = 'First Name is required';
      }
      break;

    case 'lastName':
      if (fieldValue === '') {
        isValid = false;
        errorMsg = 'Last Name is required';
      }
      break;

    case 'course':
      if (fieldValue === '' || fieldValue === '-- Select --') {
        isValid = false;
        errorMsg = 'Course is required';
      }
      break;

    case 'entryScheme':
      if (fieldValue === '' || fieldValue === '-- Select --') {
        isValid = false;
        errorMsg = 'Entry Scheme is required';
      }
      break;

    case 'intake':
      if (fieldValue === '' || fieldValue === '-- Select --') {
        isValid = false;
        errorMsg = 'Intake is required';
      }
      break;

    case 'sponsorship':
      if (fieldValue === '' || fieldValue === '-- Select --') {
        isValid = false;
        errorMsg = 'Sponsorship is required';
      }
      break;

    case 'dateOfBirth':
      if (fieldValue === '') {
        isValid = false;
        errorMsg = 'Date of Birth is required';
      } else if (!/^\d{4}\/\d{2}\/\d{2}$/.test(fieldValue)) {
        isValid = false;
        errorMsg = 'Date must be in YYYY/MM/DD format';
      }
      break;

    case 'residence':
      if (fieldValue === '') {
        isValid = false;
        errorMsg = 'Residence is required';
      }
      break;

    case 'gender':
      // Handled separately
      break;
  }

  // Update UI
  if (!isValid) {
    field.classList.add('error-input');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMsg;
    fieldGroup.appendChild(errorElement);
  } else {
    field.classList.remove('error-input');
  }

  return isValid;
}

function validateFormClient() {
  const form = document.getElementById('applicationForm');
  const inputs = form.querySelectorAll('input, select');
  let isFormValid = true;

  // Validate all fields
  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  // Validate gender separately (radio buttons)
  const genderRadios = form.querySelectorAll('input[name="gender"]');
  const genderSelected = Array.from(genderRadios).some(radio => radio.checked);

  if (!genderSelected) {
    isFormValid = false;
    const genderGroup = form.querySelector('input[name="gender"]').closest('.form-group');
    const existingError = genderGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = 'Gender is required';
    genderGroup.appendChild(errorElement);
  } else {
    const genderGroup = form.querySelector('input[name="gender"]').closest('.form-group');
    const existingError = genderGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
  }

  return isFormValid;
}