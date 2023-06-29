function updatePoints_html(points) {
  document.getElementById("statusBarTextPoints").innerHTML =
    "Points: " + points;
}

function displayLogInData(userData) {
  document.getElementById("statusBarTextStreak").innerHTML =
    "Streak: " + userData.streak;
}

var coll = document.getElementsByClassName("collapsibleButtonList");
var i;

coll[0].addEventListener("click", function () {
  this.classList.toggle("active");
  var content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});
