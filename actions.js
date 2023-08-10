export default class Actions {
  clean(hasPoop) {
    return false;
  }

  feed(hungry) {
    return hungry < 5 ? ++hungry : (hungry = 5);
  }

  train() {}
}
