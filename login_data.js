export default class LoginHandler {
  dailySignIn() {
    const dsiData = localStorage.getItem("DSI");
    if (dsiData) {
      const dsiData_asJSON = JSON.parse(dsiData);
      recordDailySignInData(dsiData_asJSON);
    } else {
      addDSIRecords();
      recordDailySignInData(JSON.parse(localStorage.getItem("DSI")));
    }
  }

  checkSignInToday() {
    const dsiData = localStorage.getItem("DSI");
    if (dsiData) {
      const dateOfLastSignIn = new Date(JSON.parse(dsiData).lastSignIn);
      return this.isItToday(dateOfLastSignIn);
    }
    return false;
  }

  //mack
  isItToday(date) {
    const today = new Date();
    return (
      today.getDay() == date.getDay() &&
      today.getMonth().toString() == date.getMonth().toString() &&
      today.getYear().toString() == date.getYear().toString()
    );
  }

  isItMoreThanADay(date) {
    return new Date().getTime() - new Date(date).getTime() > 1;
  }

  // Store DSI records
  addDSIRecords() {
    localStorage.setItem(
      "DSI",
      JSON.stringify({
        lastSignIn: new Date().toLocaleDateString(),
        streak: 0,
      })
    );
  }

  recordDailySignInData(dsiData_asJSON) {
    dsiData_asJSON.lastSignIn = new Date().toLocaleDateString();
    if (this.isItMoreThanADay(dsiData_asJSON.lastSignIn)) {
      dsiData_asJSON.streak = 0;
    }
    dsiData_asJSON.streak++;
    localStorage.setItem("DSI", JSON.stringify(dsiData_asJSON));
  }

  getLogInData_asJSON() {
    return JSON.parse(localStorage.getItem("DSI"));
  }
}
