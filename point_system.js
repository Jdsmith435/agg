const dsiPoints = 50; // points for daily sign in

function addDSIPoints(userData) {
  userData.totalPoints += dsiPoints;
  saveUserData(userData);
}
