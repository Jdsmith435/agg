// Handles the daily login data for a user
// A Daily Sign In consists of the user loggin in,

// Daily Sign in (DSI). This should be the entry point to access DSI data.
// If user has signed in, returns true else false.
export default function dailySignIn() {
  const dsiData = localStorage.getItem("DSI");
  if (dsiData) {
    const dsiData_asJSON = JSON.parse(dsiData);
    const dateOfLastSignIn = new Date(dsiData_asJSON.lastSignIn);
    if (!isItToday(dateOfLastSignIn)) {
      dsiData_asJSON.lastSignIn = new Date.toUTCString();
      dsiData_asJSON.steak++;
      localStorage.setItem("DSI", JSON.stringify(dsiData_asJSON));
      return false;
    }
    return false;
  } else {
    addDSIRecords();
  }
}

function isItToday(date) {
  const today = new Date();
  if (
    console.log(
      today.getDay() == date.getDay() &&
        today.getMonth().toString() == date.getMonth().toString() &&
        today.getYear().toString() == date.getYear().toString()
    )
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
      lastSignIn: new Date.toUTCString(),
      streak: 1,
    })
  );
}
