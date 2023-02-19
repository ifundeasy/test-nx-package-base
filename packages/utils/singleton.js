/* eslint-disable prefer-rest-params */

module.exports = class Singleton {
  static args;

  static instance;

  static register() {
    this.args = arguments;
  }

  static getInstance() {
    if (!this.instance) this.instance = new this(...(this.args || []))
    return this.instance
  }
}
