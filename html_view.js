function updatePoints_html(points) {
  document.getElementById("pointHeader").innerHTML = "Points: " + points;
}

function displayLogInData(userData) {
  document.getElementById("streak").innerHTML = "Streak: " + userData.streak;
}

var coll = document.getElementsByClassName("collapsible");
var i;

coll[0].addEventListener("click", function () {
  this.classList.toggle("active");
  console.log("CLICK");
  var content = this.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});
