import age from "./age.js";

export default class UserData {
  saveUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  getUserData_asJSON() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(userData);
    } else {
      return { totalPoints: 0, ranAway: false, petAge: age[1], hasPoop: false, hungry: 4, happy: 4 };
    }
  }

  togglePoop(HasPoop) {
    return !HasPoop;
  }
}
