export default class LoginHandler {
  static dailySignIn() {
    const dsiData = localStorage.getItem("DSI");
    if (dsiData) {
      const dsiData_asJSON = JSON.parse(dsiData);
      recordDailySignInData(dsiData_asJSON);
    } else {
      addDSIRecords();
      recordDailySignInData(JSON.parse(localStorage.getItem("DSI")));
    }
  }

  static checkSignInToday() {
    const dsiData = localStorage.getItem("DSI");
    if (dsiData) {
      const dateOfLastSignIn = new Date(JSON.parse(dsiData).lastSignIn);
      return isItToday(dateOfLastSignIn);
    }
    return false;
  }

  //mack
  static isItToday(date) {
    const today = new Date();
    return (
      today.getDay() == date.getDay() &&
      today.getMonth().toString() == date.getMonth().toString() &&
      today.getYear().toString() == date.getYear().toString()
    );
  }

  static isItMoreThanADay(date) {
    const totalDays = new Date().getTime() - new Date(date).getTime();
    return totalDays > 1;
  }

  // Store DSI records
  static addDSIRecords() {
    localStorage.setItem(
      "DSI",
      JSON.stringify({
        lastSignIn: new Date().toLocaleDateString(),
        streak: 0,
      })
    );
  }

  static recordDailySignInData(dsiData_asJSON) {
    dsiData_asJSON.lastSignIn = new Date().toLocaleDateString();
    if (isItMoreThanADay(dsiData_asJSON.lastSignIn)) {
      dsiData_asJSON.streak = 0;
    }
    dsiData_asJSON.streak++;
    localStorage.setItem("DSI", JSON.stringify(dsiData_asJSON));
  }

  static getLogInData_asJSON() {
    console.log("getting data");
    return JSON.parse(localStorage.getItem("DSI"));
  }
}
