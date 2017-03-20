module.exports = class Muscle {
  constructor(options) {
    this.key = options.key;
    this.name = options.name;

    // {name, broName, group, image}
    this.info = options.info;
  }
};