function saveUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}

function getUserData_asJSON() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  } else {
    return { totalPoints: 0 }; // probably need creature data here too
  }
}
