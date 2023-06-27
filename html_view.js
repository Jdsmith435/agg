function updatePoints_html(points) {
  document.getElementById("pointHeader").innerHTML = "Points: " + points;
}

function displayLogInData(userData) {
  document.getElementById("streak").innerHTML = "Streak: " + userData.streak;
}
