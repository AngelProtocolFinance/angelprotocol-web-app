export default class Disconnected extends Error {
  constructor() {
    super();
    this.name = "wallet disconnected";
  }
}
