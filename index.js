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
  console.log("Checking game data");
  const gameData = localStorage.getItem("aggGameData");
  if (!gameData) {
    console.log("No DATA");
    localStorage.setItem(
      "aggGameData",
      JSON.stringify({
        dateStart: "Date Here",
      })
    );
  } else {
    console.log("has DATA");
    console.log(JSON.parse(gameData).dateStart);
  }
}

function clearGameStorage() {
  localStorage.clear();
}
