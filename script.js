const button = document.querySelector('.btn');

button.addEventListener('click', () => {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters

  if (weight > 0 && height > 0) {
    const bmiValue = (weight / (height * height)).toFixed(2); // Calculate BMI and round to 2 decimals
    const bmiElement = document.getElementById("bmiValue");
    const status = document.getElementById("bmiStatus");

    bmiElement.innerHTML = bmiValue;

    if (bmiValue < 18.5) {
      status.innerHTML = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      status.innerHTML = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      status.innerHTML = "Overweight";
    } else {
      status.innerHTML = "Obese";
    }
  } else {
    alert("Please enter valid values for weight and height.");
  }
});
