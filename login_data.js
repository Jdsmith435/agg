// Handles the daily login data for a user
// A Daily Sign In consists of the user loggin in,

// Daily Sign in (DSI). This should be the entry point to access DSI data.
// If user has signed in, returns true else false.
function dailySignIn() {
  const dsiData = localStorage.getItem("DSI");
  if (dsiData) {
    const dsiData_asJSON = JSON.parse(dsiData);
    recordDailySignInData(dsiData_asJSON);
  } else {
    addDSIRecords();
    recordDailySignInData(JSON.parse(localStorage.getItem("DSI")));
  }
}

function checkSignInToday() {
  const dsiData = localStorage.getItem("DSI");
  if (dsiData) {
    const dateOfLastSignIn = new Date(JSON.parse(dsiData).lastSignIn);
    return isItToday(dateOfLastSignIn);
  }
  return false;
}

//mack
function isItToday(date) {
  const today = new Date();
  if (
    today.getDay() == date.getDay() &&
    today.getMonth().toString() == date.getMonth().toString() &&
    today.getYear().toString() == date.getYear().toString()
  ) {
    return true;
  }
  return false;
}

// Store DSI records
function addDSIRecords() {
  localStorage.setItem(
    "DSI",
    JSON.stringify({
      lastSignIn: new Date().toUTCString(),
      streak: 1,
    })
  );
}

function recordDailySignInData(dsiData_asJSON) {
  dsiData_asJSON.lastSignIn = new Date().toUTCString();
  dsiData_asJSON.steak++;
  localStorage.setItem("DSI", JSON.stringify(dsiData_asJSON));
}

function getLogInData_asJSON() {
  console.log("getting data");
  return JSON.parse(localStorage.getItem("DSI"));
}
