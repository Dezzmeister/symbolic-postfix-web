import Variable from "../structure/Variable";
import Value from "../structure/Value";
import {plus, multiply} from "../structure/builder/ShorthandFunctions"

/**
 * Testing the symbolic-postfix/structure classes and Expression trees.
 */
function structureTests(): void {
	let var0 = new Variable("x");
	let expr0 = multiply([new Value(4), var0]);
	let expr1 = plus([expr0, new Value(3)]);

	console.log("Expr1: " + expr1)
	console.log("Deriv1(x): " + expr1.derivative("x"));
	console.log("Deriv1(y): " + expr1.derivative("y"));

	let expr2 = multiply([var0, var0]);
	console.log("Expr2: " + expr2);
	console.log("Deriv2(x): " + expr2.derivative("x"));

	let expr3 = multiply([var0, var0, var0]);
	console.log("Expr2: " + expr3);
	console.log("Deriv2(x): " + expr3.derivative("x"));
}

export default structureTests;