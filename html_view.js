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
    document.getElementById("statusBarTextPoints").innerHTML = "Points: " + points;
  }

  displayLogInData(userData) {
    document.getElementById("statusBarTextStreak").innerHTML = "Streak: " + userData.streak;
  }

  updateHunger_html(hungerLevel) {
    let hearts = "";
    if (hungerLevel > 0) {
      for (let i = 0; i < hungerLevel; i++) {
        hearts += "\u2665";
      }
      for (let i = 0; i < 5 - hungerLevel; i++) {
        hearts += "\u2661";
      }
    } else {
      hearts = "\u2661\u2661\u2661\u2661\u2661";
    }
    document.getElementById("statusBarHungry").innerHTML = "Chock-full: " + hearts;
  }

  updateHappy_html(happyLevel) {
    let hearts = "";
    if (happyLevel > 0) {
      for (let i = 0; i < happyLevel; i++) {
        hearts += "\u2665";
      }
      for (let i = 0; i < 5 - happyLevel; i++) {
        hearts += "\u2661";
      }
    } else {
      hearts = "\u2661\u2661\u2661\u2661\u2661";
    }
    document.getElementById("statusBarHappy").innerHTML = "Tickled Pink: " + hearts;
  }

  displayLogInData(userData) {
    document.getElementById("statusBarTextStreak").innerHTML = "Streak: " + userData.streak;
  }
}
