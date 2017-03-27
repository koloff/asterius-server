module.exports = function(number) {
    return +(Math.round(number + "e+2")  + "e-2");
};