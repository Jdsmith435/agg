export default class PointSystem {
  dsiPoints = 50; // points for daily sign in

  addDSIPoints(userData) {
    dailySignIn();
    userData.totalPoints += dsiPoints;
    saveUserData(userData);
  }

  addNumPoints(userData, pointsToAdd) {
    userData.totalPoints += pointsToAdd;
    saveUserData(userData);
  }

  removeNumPoints(userData, pointsToRemove) {
    userData.totalPoints -= pointsToRemove;
    saveUserData(userData);
  }
}
