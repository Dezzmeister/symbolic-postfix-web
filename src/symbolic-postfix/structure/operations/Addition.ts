import Expression from "../Expression";
import Function from "../Function";
import Variable from "../Variable";
import Value from "../Value";

/**
 * The addition operation, with any number of addends.
 * 
 * @author Joe Desmond
 */
export default class Addition extends Function {

	/**
	 * Maximum number of allowed addends
	 */
	public static readonly MAX_ALLOWED_ARGS:number = 200;

	/**
	 * Creates an instance of the addition operation with the given arguments. At least two arguments are
	 * required, and the number of arguments must not exceed {@link Addition#MAX_ALLOWED_ARGS}.
	 * 
	 * @param {Array<Expression>} args arguments to the addition operation 
	 */
	public constructor(args: Array<Expression>) {
		super("+", args, 2, Addition.MAX_ALLOWED_ARGS, true);
	}

	/**
	 * The derivative of a sum is the sum of the individual derivatives.
	 * 
	 * @param {string} variable variable with which to calculate derivative
	 * @return {Expression} derivative of this Addition 
	 */
	public derivative(variable: string): Expression {
		let derivs = new Array<Expression>();

		for (let i = 0; i < this.args.length; i++) {
			derivs[i] = this.args[i].derivative(variable);
		}

		return new Addition(derivs);
	}

	/**
	 * TODO: Implement this
	 * 
	 * @param {Map<Variable, Value>} knowns known variables
	 * @return {Expression} simplified version of this addition
	 */
	public simplify(knowns: Map<Variable, Value>): Expression {
		return this;
	}

	/**
	 * Returns a string containing expressions joined by "+" as an infix operator.
	 * 
	 * @return {string} string representing this addition
	 */
	public toString(): string {
		let out = "(" + this.args[0].toString();

		for (let i = 1; i < this.args.length; i++) {
			out = out + " + " + this.args[i].toString();
		}

		out += ")";

		return out;
	}
}