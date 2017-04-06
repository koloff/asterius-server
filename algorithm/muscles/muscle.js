module.exports = class Muscle {
  constructor(options) {
    this.key = options.key;
    this.mev = options.mev;
    this.mrv = options.mrv;
    this.types = options.types;

    // {name, broName, group, image}
    this.info = options.info;
  }
};