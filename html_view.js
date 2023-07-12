export default class HtmlView {
  constrcutor() {
    coll = document.getElementsByClassName("collapsibleButtonList");
    i;

    this.coll[0].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  static updatePoints_html(points) {
    document.getElementById("statusBarTextPoints").innerHTML =
      "Points: " + points;
  }

  static displayLogInData(userData) {
    document.getElementById("statusBarTextStreak").innerHTML =
      "Streak: " + userData.streak;
  }
}
