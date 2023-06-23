window.onload = main();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
var gameData = 0;

function main() {
  if (!checkSignInToday()) {
    addDSIPoints(getUserData_asJSON());
  }
  gameData = getUserData_asJSON();
  updatePoints_html(gameData.totalPoints);
}

function createGamePiece() {
  ctx.beginPath();
  ctx.rect(20, 40, 50, 50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function saveGame() {
  localStorage.setItem("myCat", "Tom");
}

function loadGame() {
  const cat = localStorage.getItem("myCat");
  console.log(cat);
}

function clearGameStorage() {
  localStorage.clear();
}
