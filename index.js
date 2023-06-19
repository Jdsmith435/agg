const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function createGamePiece() {
  ctx.beginPath();
  ctx.rect(20, 40, 50, 50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function pressButton() {
  console.log("PRESSED!");
}
