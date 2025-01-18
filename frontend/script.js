document.getElementById('submit-button').addEventListener('click', async function() {
  // Collect data from form fields
  const gender = document.getElementById('gender').value;
  const ageRange = document.getElementById('age-range').value;
  const skinColor = document.getElementById('skinColor').value;
  const height = document.getElementById('height').value;
  const income = document.getElementById('income').value;

  // Validation: Check if all required fields are filled
  if (!gender || !ageRange || !skinColor || !height) {
      document.getElementById('validation-message').style.display = 'block'; // Show the validation message
      return; // Stop the form submission
  }

  // Create preferences object
  const preferences = {
      gender,
      age: ageRange,  // This will be a number between 18 and 60 (from the range slider)
      skinColor,
      height,
      income: income ? parseInt(income) : null,  // If income is not provided, use null
  };

  try {
      // Show loading spinner or indication (optional)
      document.getElementById('submit-button').disabled = true;  // Disable the button during request
      document.getElementById('submit-button').textContent = 'Calculating...';

      // Send data to the backend
      const response = await fetch('https://lovesearch.onrender.com/calculate ', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferences),
      });

      // Check if the response is successful
      if (!response.ok) {
          throw new Error('Failed to calculate rarity');
      }

      // Parse the response from the backend
      const data = await response.json();
      const rarityPercentage = data.rarity;

      // Display the rarity result
      document.getElementById('rarity-percentage').textContent = `${rarityPercentage}%`;

      // Calculate chances of meeting (inverse of rarity)
      const chancesOfMeeting = (100 - parseFloat(rarityPercentage)).toFixed(2);

      // Display the chances of meeting result
      document.getElementById('chances-percentage').textContent = `${chancesOfMeeting}%`;
  } catch (error) {
      console.error('Error:', error);
  } finally {
      // Re-enable the submit button
      document.getElementById('submit-button').disabled = false;
      document.getElementById('submit-button').textContent = 'Calculate Rarity';
  }
});

// Update the label of the age range input
function updateAgeLabel() {
  const ageLabel = document.getElementById('age-label');
  const ageRange = document.getElementById('age-range');
  ageLabel.textContent = ageRange.value;
}
