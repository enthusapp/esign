function Tool() {
}

function decimalAdjust(type, inValue, inExp) {
  let value = inValue;
  let exp = inExp;

  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }

  value = +value;
  exp = +exp;

  if (Number.isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }

  value = value.toString().split('e');
  value = Math[type](+(`${value[0]}e${(value[1] ? (+value[1] - exp) : -exp)}`));
  value = value.toString().split('e');

  return +(`${value[0]}e${(value[1] ? (+value[1] + exp) : exp)}`);
}

module.exports = new Tool();

Tool.prototype.round10 = (value, exp) => decimalAdjust('round', value, exp);
Tool.prototype.ceil10 = (value, exp) => decimalAdjust('ceil', value, exp);
