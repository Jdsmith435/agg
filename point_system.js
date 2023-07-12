export default class PointSystem {
  dsiPoints = 50; // points for daily sign in

  static addDSIPoints(userData) {
    dailySignIn();
    userData.totalPoints += dsiPoints;
    saveUserData(userData);
  }

  static addNumPoints(userData, pointsToAdd) {
    userData.totalPoints += pointsToAdd;
    saveUserData(userData);
  }

  static removeNumPoints(userData, pointsToRemove) {
    userData.totalPoints -= pointsToRemove;
    saveUserData(userData);
  }
}
