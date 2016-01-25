module.exports = {
	lower: function (text) {
		return String(text).toLowerCase();
	},

	upper: function (text) {
		return String(text).toUpperCase();
	},
	everyOther: function (index, amount, scope) {
		if (++index % amount)
			return scope.inverse(this);
		else
			return scope.fn(this);
	},
	math:function(lvalue, operator, rvalue, options) {
		lvalue = parseFloat(lvalue);
		rvalue = parseFloat(rvalue);

		return {
			"+": lvalue + rvalue,
			"-": lvalue - rvalue,
			"*": lvalue * rvalue,
			"/": lvalue / rvalue,
			"%": lvalue % rvalue
		}[operator];
	}
};