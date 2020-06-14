import Expression from "../Expression";
import Function from "../Function";
import {SplitFunction} from "../Function";
import Variable from "../Variable";
import Value from "../Value";
import {plus, multiply} from "../builder/ShorthandFunctions";

/**
 * The multiplication operation, with any number of operands.
 * 
 * @author Joe Desmond
 */
export default class Multiplication extends Function {

	/**
	 * Maximum number of allowed operands
	 */
	public static readonly MAX_ALLOWED_ARGS:number = 200;

	/**
	 * Creates an instance of the multiplication operation with the given arguments. At least two arguments are
	 * required, and the number of arguments must not exceed {@link Multiplication#MAX_ALLOWED_ARGS}.
	 * 
	 * @param {Array<Expression>} args arguments to the multiplication operation 
	 */
	public constructor(args: Array<Expression>) {
		super("*", args, 2, Multiplication.MAX_ALLOWED_ARGS, true);
	}

	/**
	 * Returns the derivative of this multiplication chain, calculated by extending the product rule
	 * to expressions with an arbitrary number of terms.
	 * 
	 * @param {string} variable variable to calculate derivative with respect to
	 * @return {Expression} the unsimplified derivative of this Multiplication
	 */
	public derivative(variable: string): Expression {		
		let derivTerms = new Array<Expression>();
		
		for (let i = 0; i < this.args.length; i++) {
			let operands = new Array<Expression>();

			for (let j = 0; j < this.args.length; j++) {
				if (j === i) {
					operands[j] = this.args[i].derivative(variable);
				} else {
					operands[j] = this.args[i];
				}
			}

			derivTerms[i] = multiply(operands);
		}

		return plus(derivTerms);
	}

	public split(knowns: Map<Variable, Value>): SplitFunction {
		let out = {
			expressions: new Array<Expression>(),
			value: Value.ZERO
		};

		return out;
	}

	/**
	 * TODO: Implement this
	 * 
	 * @param {Map<Variable, Value>} knowns known variables
	 * @return {Expression} simplified version of this multiplication
	 */
	public simplify(knowns: Map<Variable, Value>): Expression {
		let simplArgs = new Array<Expression>();
		
		for (let i = 0; i < this.args.length; i++) {
			simplArgs.push(this.args[i].simplify(knowns));
		}

		return new Multiplication(simplArgs);
	}

	/**
	 * Returns a string containing expressions joined by "*" as an infix operator.
	 * 
	 * @return {string} string representing this multiplication
	 */
	public toString(): string {
		let out = "(" + this.args[0].toString();

		for (let i = 1; i < this.args.length; i++) {
			out = out + " * " + this.args[i].toString();
		}

		out += ")";

		return out;
	}
}