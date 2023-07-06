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
  return (
    today.getDay() == date.getDay() &&
    today.getMonth().toString() == date.getMonth().toString() &&
    today.getYear().toString() == date.getYear().toString()
  );
}

function isItMoreThanADay(date) {
  const totalDays = new Date().getTime() - new Date(date).getTime();
  return totalDays > 1;
}

// Store DSI records
function addDSIRecords() {
  localStorage.setItem(
    "DSI",
    JSON.stringify({
      lastSignIn: new Date().toLocaleDateString(),
      streak: 0,
    })
  );
}

function recordDailySignInData(dsiData_asJSON) {
  dsiData_asJSON.lastSignIn = new Date().toLocaleDateString();
  if (isItMoreThanADay(dsiData_asJSON.lastSignIn)) {
    dsiData_asJSON.streak = 0;
  }
  dsiData_asJSON.streak++;
  localStorage.setItem("DSI", JSON.stringify(dsiData_asJSON));
}

function getLogInData_asJSON() {
  console.log("getting data");
  return JSON.parse(localStorage.getItem("DSI"));
}
