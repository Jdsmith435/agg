export default class LoginHandler {
  dailySignIn() {
    const dsiData = getLogInData_asJSON();
    if (dsiData) {
      recordDailySignInData(dsiData);
    } else {
      addDSIRecords();
      recordDailySignInData(getLogInData_asJSON());
    }
  }

  checkSignInToday(loginData) {
    if (loginData) {
      const dateOfLastSignIn = new Date(loginData.lastSignIn);
      return this.isItToday(dateOfLastSignIn);
    }
    return false;
  }

  //mack
  isItToday(date) {
    const today = new Date();
    return (
      today.getDay() == date.getDay() && today.getMonth().toString() == date.getMonth().toString() && today.getYear().toString() == date.getYear().toString()
    );
  }

  isItMoreThanADay(date) {
    return Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)) > 1;
  }

  // Store DSI records
  addDSIRecords() {
    const currentDate = new Date();
    this.saveLogInData({
      lastSignIn: currentDate.setDate(currentDate.getDate() - 1),
      streak: 0,
    });
  }

  recordDailySignInData(dsiData_asJSON) {
    // dsiData_asJSON.lastSignIn = new Date().toLocaleDateString();
    if (this.isItMoreThanADay(dsiData_asJSON.lastSignIn)) {
      dsiData_asJSON.streak = 0;
    }
    dsiData_asJSON.streak++;
    dsiData_asJSON.lastSignIn = new Date().toLocaleDateString();
    this.saveLogInData(dsiData_asJSON);
  }

  getLogInData_asJSON() {
    let logginData = JSON.parse(localStorage.getItem("DSI"));
    if (logginData != null) {
      return logginData;
    }
    this.addDSIRecords();
    return this.getLogInData_asJSON();
  }

  saveLogInData(dsiData_asJSON) {
    localStorage.setItem("DSI", JSON.stringify(dsiData_asJSON));
  }

  modifyLogInData() {
    localStorage.setItem("DSI", JSON.stringify({ lastSignIn: "8/18/23", streak: 10 }));
  }
}
