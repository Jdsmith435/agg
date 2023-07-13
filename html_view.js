export default class HtmlView {
  constructor() {
    var coll = document.getElementById("collapsibleButtonList");

    coll.addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  updatePoints_html(points) {
    document.getElementById("statusBarTextPoints").innerHTML =
      "Points: " + points;
  }

  displayLogInData(userData) {
    document.getElementById("statusBarTextStreak").innerHTML =
      "Streak: " + userData.streak;
  }
}
