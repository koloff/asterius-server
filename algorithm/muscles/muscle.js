module.exports = class {
  constructor(options) {
    this.key = options.key;
    this.name = options.name;

    // info: {name, broName, group, image}
    this.info = options.info;
  }

  getUsage(percentage) {
    return {
      key: this.key,
      percentage: percentage
    }
  }

};