const dsiPoints = 50; // points for daily sign in

function addDSIPoints(userData) {
  dailySignIn();
  userData.totalPoints += dsiPoints;
  saveUserData(userData);
}

function addNumPoints(userData, pointsToAdd) {
  dailySignIn();
  userData.totalPoints += pointsToAdd;
  saveUserData(userData);
}
