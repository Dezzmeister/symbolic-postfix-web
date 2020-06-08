import Variable from "./Variable";
import Value from "./Value";

/**
 * A high-level mathematical expression. Has a recursive structure consisting of Values, Variables, and Functions.
 * 
 * @author Joe Desmond
 */
export default interface Expression {
		
	/**
	 * Returns the symbolic derivative of this Expression with respect to the given variable.
	 * 
	 * @param {string} variable variable to differentiate with respect to
	 * @return {Expression} the derivative of this expression with respect to 'variable'
	 */
	derivative(variable: string): Expression;

	/**
	 * Simplifies this Expression given a set of known variables.
	 * 
	 * @param {Map<Variable, Value>} knowns known variables
	 * @return {Expression} simplified version of this Expression
	 */
	simplify(knowns: Map<Variable, Value>): Expression;

	/**
	 * Returns true if this Expression has the same structure as 'other',
	 * and the same value (without evaluating).
	 * 
	 * @param {Expression} other other Expression to check equality with
	 * @return {boolean} true if 'other' is structurally equal to this Expression
	 */
	structuralEquals(other: Expression): boolean;

	/**
	 * Returns a string representing the expression.
	 * 
	 * @return {string} human-readable version of this Expression
	 */
	toString(): string;
}