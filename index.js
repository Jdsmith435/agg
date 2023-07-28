import PointSystem from "./point_system.js";
import UserData from "./user_data.js";
import HtmlView from "./html_view.js";
import LoginHandler from "./login_data.js";
import Actions from "./actions.js";

export default class Main {
  gameData;
  canvas;
  ctx;

  // Utilities
  pointSystem;
  userDataHandler;
  htmlView;
  loginHandler;
  action;

  // Animation constants
  xPosSlow = -40;
  xPosMedium = 0;
  xPosFast = 40;
  flipped = false;

  // loaded images
  small_cloud = new Image();
  big_cloud = new Image();
  plateau = new Image();
  chicken = new Image();
  chickenFlipped = new Image();
  poop = new Image();

  // chicken
  chickenPosX;

  constructor() {
    this.pointSystem = new PointSystem();
    this.userDataHandler = new UserData();
    this.htmlView = new HtmlView();
    this.loginHandler = new LoginHandler();
    this.action = new Actions();

    this.gameData = this.userDataHandler.getUserData_asJSON();

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.setAttribute("width", window.innerWidth - 15 + "px");
    this.canvas.setAttribute("height", window.innerHeight * 0.6 + "px");
    this.ctx = this.canvas.getContext("2d");

    this.small_cloud.src = "./small_cloud.svg";
    this.big_cloud.src = "./big_cloud.svg";
    this.plateau.src = "./plateau.svg";
    this.chicken.src = "./chicken.svg";
    this.chickenFlipped.src = "./chicken_flipped.svg";
    this.poop.src = "./poop.svg";

    this.chickenPosX = this.canvas.width / 2;
    this.startAnimation();
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
    }, 700);
  }

  cloudBackground() {
    this.generateChickenPosX();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.small_cloud, this.xPosSlow, 20, 50, 20);
    this.ctx.drawImage(this.big_cloud, this.xPosFast, 45, 160, 80);
    this.ctx.drawImage(this.plateau, -20, this.canvas.height - this.plateau.height, this.plateau.width + 130, this.plateau.height + 20);
    this.ctx.drawImage(this.poop, this.canvas.width * 0.8, this.canvas.height - 50, 70, 50);
    this.ctx.fillRect(this.canvas.width * 0.8 + Math.floor(Math.random() * 10), this.canvas.height - 50 + Math.floor(Math.random() * 10), 5, 5);
    this.ctx.fillRect(this.canvas.width * 0.8 + Math.floor(Math.random() * 10), this.canvas.height - 50 + Math.floor(Math.random() * 10), 5, 5);

    if (this.flipped) {
      this.ctx.drawImage(this.chickenFlipped, this.chickenPosX, this.canvas.height - 100, 100, 100);
    } else {
      this.ctx.drawImage(this.chicken, this.chickenPosX, this.canvas.height - 100, 100, 100);
    }

    this.adjustPositions();
  }

  adjustPositions() {
    this.xPosSlow += 5;
    this.xPosFast += 15;
    if (this.xPosSlow > this.canvas.width + 50) {
      this.xPosSlow = -40;
      this.xPosMedium = -40;
    }
    if (this.xPosFast > this.canvas.width + 50) {
      this.xPosFast = -40;
    }
  }

  generateChickenPosX() {
    var direction = Math.floor(Math.random() * 2);
    if (direction == 1) {
      if (this.chickenPosX + 10 < this.canvas.width) {
        this.chickenPosX += 10;
        this.flipped = false;
      } else {
        this.chickenPosX -= 10;
        this.flipped = true;
      }
    } else {
      if (this.chickenPosX - 10 > 0) {
        this.chickenPosX -= 10;
        this.flipped = true;
      } else {
        this.chickenPosX += 10;
        this.flipped = false;
      }
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

  actionButton1() {
    this.action.clean();
  }

  actionButton2() {
    this.action.feed();
  }

  actionButton3() {
    this.action.train();
  }

  actionButton4() {
    console.log("TODO");
  }
}
