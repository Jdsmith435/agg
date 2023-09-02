import PointSystem from "./point_system.js";
import UserData from "./user_data.js";
import HtmlView from "./html_view.js";
import LoginHandler from "./login_data.js";
import Actions from "./actions.js";
import Ages from "./age.js";

export default class Main {
  gameData;
  logginData;
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

  // positions
  chickenPosX;
  foodPosition;
  chickenDestinationCount;

  // canvas modifiers
  foodOnGround = 0;
  poonCleanUp = 0;
  chickenJump = 0;

  // interval ids
  foodAnimationInterval;

  plateauHeight = 160;

  constructor() {
    this.pointSystem = new PointSystem();
    this.userDataHandler = new UserData();
    this.htmlView = new HtmlView();
    this.loginHandler = new LoginHandler();
    this.action = new Actions();

    this.gameData = this.userDataHandler.getUserData_asJSON();
    this.logginData = this.loginHandler.getLogInData_asJSON();

    this.canvas = document.getElementById("gameCanvas");
    this.canvas.setAttribute("width", window.innerWidth - 15 + "px");
    this.canvas.setAttribute("height", window.innerHeight * 0.4 + "px");
    this.ctx = this.canvas.getContext("2d");

    this.small_cloud.src = "./small_cloud.svg";
    this.big_cloud.src = "./big_cloud.svg";
    this.plateau.src = "./plateau.svg";
    this.chicken.src = "./chicken.svg";
    this.chickenFlipped.src = "./chicken_flipped.svg";
    this.poop.src = "./poop.svg";

    this.chickenPosX = this.canvas.width / 2;
    this.foodPosition = this.canvas.width * 0.65;
  }

  dailySignIn() {
    if (
      !this.loginHandler.checkSignInToday(this.loginHandler.getLogInData_asJSON()) // if false, record sign in and add points
    ) {
      this.loginHandler.recordDailySignInData(this.loginHandler.getLogInData_asJSON());
      this.pointSystem.addDSIPoints(this.userDataHandler, this.gameData);
      this.gameData.hungry = this.generateHungryStat(this.gameData.hungry);
      this.gameData.happy = this.generateHappyStat(this.gameData.happy, this.gameData.hungry);

      if (this.userDataHandler.petAge != Ages[1]) this.gameData.hasPoop = this.userDataHandler.togglePoop(this.gameData.hasPoop);
      this.userDataHandler.saveUserData(this.gameData);
    }

    if (this.gameData.hungry <= 0 && this.gameData.happy <= 0) {
      this.gameData.ranAway = true;
      this.canvasDisplayGameOver();
    } else {
      this.startAnimation();
    }

    // View handling for streak and points
    this.callToUpdateStats();
  }

  callToUpdateStats() {
    this.htmlView.updatePoints_html(this.gameData.totalPoints);
    this.htmlView.displayLogInData(this.loginHandler.getLogInData_asJSON());
    // set display
    this.htmlView.updateHunger_html(this.gameData.hungry);
    this.htmlView.updateHappy_html(this.gameData.happy);
  }

  startAnimation() {
    setInterval(() => {
      this.cloudBackground();
    }, 300);
  }

  foodCounterAnimation() {
    this.foodAnimationInterval = setInterval(() => {
      this.foodOnGround--;
    }, 700);
  }

  canvasDisplayGameOver() {
    let textWidth = this.canvas.width - 100;
    this.ctx.drawImage(this.plateau, -20, this.canvas.height - this.plateauHeight + 15, this.canvas.width + 130, this.plateauHeight);
    this.ctx.font = "48px Malboro";
    this.ctx.fillText("Oh No, Partner!", this.canvas.width / 2 - textWidth / 2, this.canvas.height / 2, this.canvas.width - 100);
    this.ctx.fillText("Your Chicken Ran Away!", this.canvas.width / 2 - textWidth / 2, this.canvas.height / 2 + 40, this.canvas.width - 100);
  }

  cloudBackground() {
    this.ctx.fillStyle = "black";
    this.generateChickenPosX();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.small_cloud, this.xPosSlow, 20, 50, 20);
    this.ctx.drawImage(this.big_cloud, this.xPosFast, 45, 160, 80);
    this.ctx.drawImage(this.plateau, -20, this.canvas.height - this.plateauHeight + 15, this.canvas.width + 130, this.plateauHeight);

    let chickenHeight;
    if (this.foodOnGround > 0) this.chickenPosX = this.foodPosition - 90;
    if (this.foodOnGround % 2 == 0) {
      chickenHeight = 100;
    } else {
      chickenHeight = 90;
    }
    if (this.chickenDestinationCount < 0 && this.foodOnGround <= 0) {
      this.ctx.drawImage(this.chickenFlipped, this.chickenPosX, this.canvas.height - chickenHeight - this.chickenJump, 100, chickenHeight);
    } else {
      this.ctx.drawImage(this.chicken, this.chickenPosX, this.canvas.height - chickenHeight - this.chickenJump, 100, chickenHeight);
    }

    // Poop
    if (this.gameData.hasPoop) {
      this.ctx.drawImage(this.poop, this.canvas.width * 0.15, this.canvas.height - 50, 70, 50);
      this.ctx.fillRect(this.canvas.width * 0.15 + 60 + Math.floor(Math.random() * 10), this.canvas.height - 50 + Math.floor(Math.random() * 20), 5, 5);
      this.ctx.fillRect(this.canvas.width * 0.15 - Math.floor(Math.random() * 10) + 10, this.canvas.height - 50 - Math.floor(Math.random() * 20), 5, 5);
    }

    // food
    if (this.foodOnGround > 0) {
      let lastPostition;
      this.ctx.fillRect(this.foodPosition, this.canvas.height - 15, 35, 15);
      this.ctx.fillStyle = "gray";
      if (this.foodOnGround % 2 == 1) {
        this.ctx.fillRect(this.foodPosition - 5, this.canvas.height - 20, 5, 5);
        this.ctx.fillRect(this.foodPosition + 35, this.canvas.height - 20, 5, 5);
      }
      if (this.foodOnGround > 1) {
        lastPostition = (35 - 25) / 2;
        this.ctx.fillRect(this.foodPosition + lastPostition, this.canvas.height - 20, 25, 5);
        if (this.foodOnGround > 2) {
          lastPostition += (25 - 17) / 2;
          this.ctx.fillRect(this.foodPosition + lastPostition, this.canvas.height - 25, 17, 5);
          if (this.foodOnGround % 2 == 1) {
            this.ctx.fillRect(this.foodPosition + lastPostition - 5, this.canvas.height - 30, 5, 5);
            this.ctx.fillRect(this.foodPosition + lastPostition + 17, this.canvas.height - 30, 5, 5);
          }
          if (this.foodOnGround > 3) {
            lastPostition += (17 - 10) / 2;
            this.ctx.fillRect(this.foodPosition + lastPostition, this.canvas.height - 30, 10, 5);
          }
        }
      }
    } else {
      clearInterval(this.foodAnimationInterval);
    }

    this.adjustPositions();
  }

  adjustPositions() {
    this.xPosSlow += 3;
    this.xPosFast += 10;
    if (this.xPosSlow > this.canvas.width + 50) {
      this.xPosSlow = -40;
      this.xPosMedium = -40;
    }
    if (this.xPosFast > this.canvas.width + 50) {
      this.xPosFast = -40;
    }
  }

  generateChickenPosX() {
    if (this.chickenJump > 0) this.chickenJump -= 10; // Jump logic

    if (Math.abs(this.chickenDestinationCount) > 10) {
      // Moving logic
      if (this.chickenDestinationCount > 0) {
        this.chickenPosX += 10;
        this.chickenDestinationCount -= 10;
      } else {
        this.chickenPosX -= 10;
        this.chickenDestinationCount += 10;
      }
    } else {
      // set destination logic
      var direction = (direction = Math.floor(Math.random() * 2));
      var destination = (destination = Math.floor(Math.random() * 70));
      if (direction == 1) {
        if (destination + this.chickenPosX > this.canvas.width - 100) {
          destination *= -1;
        }
      } else {
        if (this.chickenPosX - destination > 0) {
          destination *= -1;
        }
      }

      this.chickenDestinationCount = destination;
    }
  }

  clearGameStorage() {
    localStorage.clear();
    // this.loginHandler.modifyLogInData();
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
    if (!this.gameData.ranAway) {
      if (this.gameData.hasPoop) {
        this.gameData.hasPoop = this.action.clean(this.gameData.hasPoop);
        this.gameData = this.pointSystem.addNumPoints(this.gameData, 50);
        this.userDataHandler.saveUserData(this.gameData);
        this.htmlView.updatePoints_html(this.gameData.totalPoints);
        this.poonCleanUp = 5;
      }
    } else {
      this.resetGame();
    }
  }

  actionButton2() {
    if (!this.gameData.ranAway) {
      if (this.foodOnGround <= 0 && this.gameData.hungry < 5) {
        this.gameData.hungry = this.action.feed(this.gameData.hungry);
        this.htmlView.updateHunger_html(this.gameData.hungry);
        this.foodOnGround = 4;
        this.gameData = this.pointSystem.addNumPoints(this.gameData, 50);
        this.userDataHandler.saveUserData(this.gameData);
        this.htmlView.updatePoints_html(this.gameData.totalPoints);
        this.foodCounterAnimation();
      }
    } else {
      this.resetGame();
    }
  }

  actionButton3() {
    if (!this.gameData.ranAway) {
      if (this.chickenJump <= 0 && this.gameData.happy < 5) {
        this.gameData.happy = this.action.train(this.gameData.happy);
        this.htmlView.updateHappy_html(this.gameData.happy);
        this.chickenJump = 50;
        this.gameData = this.pointSystem.addNumPoints(this.gameData, 50);
        this.userDataHandler.saveUserData(this.gameData);
        this.htmlView.updatePoints_html(this.gameData.totalPoints);
      }
    } else {
      this.resetGame();
    }
  }

  generateHungryStat(hungryStat) {
    switch (hungryStat) {
      case 5:
      case 4:
      case 3:
        return (hungryStat -= 2);
      case 2:
        return (hungryStat -= 1);
      default:
        return -1;
    }
  }

  generateHappyStat(happyStat, hungryStat) {
    let scale = 0;
    switch (hungryStat) {
      case 5:
        scale = 0;
        break;
      case 4:
        scale = 0;
        break;
      case 3:
        scale = 1;
        break;
      case 2:
        scale = 2;
        break;
      default:
        scale = 3;
    }

    return (happyStat -= 2 + scale);
  }

  resetGame() {
    this.userDataHandler.resetGameData();
    this.gameData = this.userDataHandler.getUserData_asJSON();
    this.startAnimation();
    this.callToUpdateStats();
  }
}
