import Variable from "../structure/Variable";
import Value from "../structure/Value";
import {plus, multiply} from "../structure/builder/ShorthandFunctions"

/**
 * Testing the symbolic-postfix/structure classes and Expression trees.
 */
function structureTests(): void {
	let xVar = new Variable("x");

	let emptyMap = new Map<Variable, Value>();
	let xDefinedMap = new Map<Variable, Value>();

	let expr0 = multiply([new Value(4), xVar]);
	let expr1 = plus([expr0, new Value(3)]);

	console.log("Expression Structure Tests");

	console.log("Expr1: " + expr1)
	console.log("Deriv1(x): " + expr1.derivative("x"));
	console.log("Deriv1(y): " + expr1.derivative("y"));

	let expr2 = multiply([xVar, xVar]);
	console.log("Expr2: " + expr2);
	console.log("Deriv2(x): " + expr2.derivative("x"));

	let expr3 = multiply([xVar, xVar, xVar]);
	console.log("Expr3: " + expr3);
	console.log("Deriv3(x): " + expr3.derivative("x"));

	let expr4 = plus([xVar, new Variable("y"), new Value(4), new Value(5), Value.ONE]);
	console.log("Expr4: " + expr4);
	console.log("Simpl4: " + expr4.simplify(emptyMap));
	
	xDefinedMap.set(xVar, new Value(4));
	console.log("Setting x to 4:")
	console.log("Simpl4: " + expr4.simplify(xDefinedMap));
}

export default structureTests;