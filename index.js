import PointSystem from "./point_system.js";
import UserData from "./user_data.js";
import HtmlView from "./html_view.js";
import LoginHandler from "./login_data.js";

export default class Main {
  gameData;
  canvas;
  ctx;

  // Utilities
  pointSystem;
  userDataHandler;
  htmlView;
  loginHandler;

  // Animation constants
  xPosSlow = -40;
  xPosMedium = 0;
  xPosFast = 40;

  // loaded images
  small_cloud = new Image();
  big_cloud = new Image();
  plateau = new Image();

  constructor() {
    this.pointSystem = new PointSystem();
    this.userDataHandler = new UserData();
    this.htmlView = new HtmlView();
    this.loginHandler = new LoginHandler();

    this.gameData = this.userDataHandler.getUserData_asJSON();

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.setAttribute("width", window.innerWidth - 15 + "px");
    this.canvas.setAttribute("height", window.innerHeight * 0.6 + "px");
    this.ctx = this.canvas.getContext("2d");

    this.small_cloud.src = "./small_cloud.svg";
    this.big_cloud.src = "./big_cloud.svg";
    this.plateau.src = "./plateau.svg";
  }

  dailySignIn() {
    if (
      !this.loginHandler.checkSignInToday(this.loginHandler.getLogInData_asJSON()) // if false, record sign in and add points
    ) {
      this.loginHandler.recordDailySignInData(this.loginHandler.getLogInData_asJSON());
      this.pointSystem.addDSIPoints(this.userDataHandler, this.gameData);
    }

    // View handling for streak and points
    this.htmlView.updatePoints_html(this.gameData.totalPoints);
    this.htmlView.displayLogInData(this.loginHandler.getLogInData_asJSON());
  }

  startAnimation() {
    setInterval(() => {
      this.cloudBackground();
    }, 500);
  }

  cloudBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.small_cloud, this.xPosSlow, 20, 50, 20);
    this.ctx.drawImage(this.big_cloud, this.xPosFast, 45, 160, 80);
    this.ctx.drawImage(this.plateau, -20, this.canvas.height - this.plateau.height, this.plateau.width + 130, this.plateau.height + 20);

    this.xPosSlow += 10;
    this.xPosFast += 30;
    if (this.xPosSlow > this.canvas.width + 50) {
      this.xPosSlow = -40;
      this.xPosMedium = -40;
    }
    if (this.xPosFast > this.canvas.width + 50) {
      this.xPosFast = -40;
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
    this.pointSystem.addNumPoints(this.gameData, points);
    this.userDataHandler.saveUserData(this.gameData);
    this.htmlView.updatePoints_html(this.gameData.totalPoints);
  }

  removePoints(points) {
    this.pointSystem.removeNumPoints(this.gameData, points);
    this.userDataHandler.saveUserData(this.gameData);
    this.htmlView.updatePoints_html(this.gameData.totalPoints);
  }

  // View functions
  updateView_Points() {
    this.htmlView.updatePoints_html(this.gameData.totalPoints);
  }
}
