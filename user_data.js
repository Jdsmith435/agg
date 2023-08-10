export default class UserData {
  saveUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  getUserData_asJSON() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      return JSON.parse(userData);
    } else {
      return { totalPoints: 0, petName: "TODO", petAge: "TODO", hasPoop: false }; // probably need creature data here too
    }
  }
}
