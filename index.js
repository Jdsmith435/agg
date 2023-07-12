import PointSystem from "./point_system.js";
import UserData from "./user_data.js";
import HtmlView from "./html_view.js";
import LoginHandler from "./login_data.js";

export default class Main {
  gameData;
  canvas;

  // Utilities
  pointSystem;
  userData;
  htmlView;
  loginHandler;

  constructor() {
    this.pointSystem = new PointSystem();
    this.userData = new UserData();
    this.htmlView = new HtmlView();
    this.loginHandler = new LoginHandler();

    this.gameData = this.userData.getUserData_asJSON();

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.setAttribute("width", window.innerWidth - 15 + "px");
    this.canvas.setAttribute("height", window.innerHeight * 0.6 + "px");
  }

  dailySignIn() {
    if (!this.loginHandler.checkSignInToday()) {
      this.pointSystem.addDSIPoints(this.gameData);
    }
    this.htmlView.updatePoints_html(this.gameData);
    this.htmlView.displayLogInData(this.loginHandler.getLogInData_asJSON());
  }

  cloudBackground() {
    let yPos = 0;
    let xPos = 0;
    while (false) {
      var ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.rect(xPos, yPos, 40, 40);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
      ctx.draw;
      xPos++;
    }
  }

  saveGame() {
    localStorage.setItem("myCat", "Tom");
  }

  loadGame() {
    const cat = localStorage.getItem("myCat");
    console.log(cat);
  }

  clearGameStorage() {
    localStorage.clear();
  }

  print_userObject() {
    console.log(this.getUserData_asJSON());
  }

  print_loginData() {
    console.log(this.getLogInData_asJSON());
  }

  // point functions
  addPoints(points) {
    pointSystem.addNumPoints(this.userData, points);
    this.htmlView.updateView_Points(this.userData);
  }

  removePoints(points) {
    pointSystem.removeNumPoints(this.userData, points);
    this.htmlView.updateView_Points(userData);
  }

  // View functions
  updateView_Points() {
    this.htmlView.updatePoints_html(this.userData.totalPoints);
  }
}
