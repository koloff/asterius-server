module.exports = class Exercise {
  constructor(options) {
    this.key = options.key;
    this.type = options.type;
    this.musclesUsed = options.musclesUsed;

    // {name, group, images: {first, second}}
    this.info = options.info;
  }
};