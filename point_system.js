const dsiPoints = 50; // points for daily sign in

function addDSIPoints(userData) {
  dailySignIn();
  userData.totalPoints += dsiPoints;
  saveUserData(userData);
}

function addNumPoints(userData, pointsToAdd) {
  userData.totalPoints += pointsToAdd;
  saveUserData(userData);
}

function removeNumPoints(userData, pointsToRemove) {
  userData.totalPoints -= pointsToRemove;
  saveUserData(userData);
}
