export default class PointSystem {
  dsiPoints = 50; // points for daily sign in

  addDSIPoints(userDataObj, userData) {
    userData.totalPoints += this.dsiPoints;
    userDataObj.saveUserData(userData);
  }

  addNumPoints(userData, pointsToAdd) {
    userData.totalPoints += pointsToAdd;
    return userData;
  }

  removeNumPoints(userData, pointsToRemove) {
    userData.totalPoints -= pointsToRemove;
    return userData;
  }
}
