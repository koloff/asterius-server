module.exports = class Muscle {
  constructor(options) {
    this.key = options.key;
    this.mrv = options.mrv;

    // {name, broName, group, image}
    this.info = options.info;
  }
};