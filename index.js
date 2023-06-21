window.onload = checkGameStorage();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

function checkGameStorage() {
  if (!dailySignIn()) {
    console.log("Has not signed in today");
    addDSIPoints(getUserData());
  }
}

function clearGameStorage() {
  localStorage.clear();
}
