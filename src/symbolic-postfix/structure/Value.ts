import Expression from "./Expression";
import Variable from "./Variable";

/**
 * A known numeric constant. Is also an Expression.
 * 
 * @author Joe Desmond
 */
export default class Value implements Expression {

	public static readonly NEGATIVE_ONE = new Value(-1.0);
	public static readonly ZERO = new Value(0.0);
	public static readonly ONE = new Value(1.0);
	public static readonly TWO = new Value(2.0);

	/**
	 * The numeric value
	 */
	public readonly value: number;

	public constructor(value: number) {
		this.value = value;
	}

	/**
	 * Returns zero, because the derivative of a constant is zero.
	 * 
	 * @param {string} variable unused
	 * @return {Expression} zero (new Value with zero)
	 */
	public derivative(variable: string): Expression {
		return Value.ZERO;
	}
		
	/**
	 * Returns this Value, because a Value cannot be simplified.
	 * 
	 * @param {Map<Variable, Value} knowns unused
	 * @return {Expression} 'this'
	 */
	public simplify(knowns: Map<Variable, Value>): Expression {
		return this;
	}

	/**
	 * If 'other' is a Value, returns true if it has the same numerical value as this Value.
	 * If not, or if 'other' is not a Value, returns false.
	 * 
	 * @param {Expression} other another Expression
	 * @return {boolean} true if 'other' has the same numeric value as this value
	 */
	public structuralEquals(other: Expression): boolean {
		if (other instanceof Value) {
			let v = other as Value;
				return (this.value === v.value);
		}
			return false;
	}

	/**
	 * Returns this Value's numerical value as a string.
	 * 
	 * @return {string} value
	 */
	public toString(): string {
		return this.value.toString();
	}
}