namespace symbolic_postfix.structure {

	/**
	 * An unknown variable.
	 * 
	 * @author Joe Desmond
	 */
	export class Variable implements Expression {

    	/**
    	 * The name of this Variable
    	 */
    	public readonly name: string;

    	public constructor(name: string) {
        	this.name = name;
    	}

    	/**
    	 * Returns one if this Variable has the same name as the given variable, and zero if not.
    	 * 
    	 * @param {string} variable variable to differentiate with respect to
    	 * @return {Expression} one or zero
    	 */
    	public derivative(variable: string): Expression {
        	if (name === variable) {
            	return Value.ONE;
        	} else {
            	return Value.ZERO;
    		}
		}
		
		/**
		 * If a mapping for this Variable exists in 'knowns', returns the mapping.
		 * Otherwise returns this Variable.
		 * 
		 * @param {Map<Variable, Value} knowns known variables
		 * @return {Expression} simplified version of this Variable based on values set in 'knowns'
		 */
		public simplify(knowns: Map<Variable, Value>): Expression {
			if (knowns.has(this)) {
				return knowns.get(this);
			} else {
				return this;
			}
		}

		/**
		 * Returns true if 'other' is also a Variable, and has the same name as this Variable.
		 * 
		 * @param {Expression} other another Expression
		 * @return {boolean} true if 'other' is the same variable as 'this' 
		 */
		public structuralEquals(other: Expression): boolean {
			if (other instanceof Variable) {
				let v = other as Variable;

				return v.name === this.name;
			}

			return false;
		}
	}
}