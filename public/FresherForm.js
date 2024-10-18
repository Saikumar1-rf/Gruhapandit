import React from 'react';

const FresherForm = () => {
  const validateCGPA = (e) => {
    const value = e.target.value;
    if (value < 0 || value > 10) {
      e.target.setCustomValidity('CGPA must be between 0.0 and 10.0');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const validateYear = (e) => {
    const value = e.target.value;
    if (!/^\d{4}$/.test(value)) {
      e.target.setCustomValidity('Passed Out Year must be a 4-digit number');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleYearInput = (e) => {
    const value = e.target.value;
    if (value.length > 4) {
      e.target.value = value.slice(0, 4);
    }
  };

  return (
    <div>
      <div>
        <label>College Name:</label>
        <input type="text" name="collegename" required />
      </div>
      <div>
        <label>CGPA:</label>
        <input
          type="number"
          name="cgpa"
          min="0"
          max="10"
          step="0.1"
          required
          onInput={validateCGPA}
        />
      </div>
      <div>
        <label>Passed Out Year:</label>
        <input
          type="number"
          name="passedoutyear"
          onInput={(e) => {
            validateYear(e);
            handleYearInput(e);
          }}
          required
        />
      </div>
      <div>
        <label>Skills:</label>
        <textarea name="skills" required></textarea>
      </div>
    </div>
  );
};

export default FresherForm;
