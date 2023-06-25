function updatePoints_html(points) {
  document.getElementById("pointHeader").innerHTML = points;
}

function displayLogInData(userData) {
  console.log("Here");
  document.getElementById("streak").innerHTML = userData.streak;
}
