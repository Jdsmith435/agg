function saveUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}

function getUserData() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return userData;
  } else {
    return { totalPoints: 0 }; // probably need creature data here too
  }
}
