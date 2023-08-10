export default class Actions {
  clean() {
    return false;
  }

  feed(hungry) {
    return hungry < 5 ? ++hungry : (hungry = 5);
  }

  train(happy) {
    return happy < 5 ? ++happy : (happy = 5);
  }
}
