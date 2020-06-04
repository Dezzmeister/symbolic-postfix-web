namespace symbolic_postfix.structure{

    export abstract class Function implements Expression {
        public readonly name: string;
        public args: Array<Expression>;
        public readonly minArgs: number;
        public readonly maxArgs: number;

        constructor(name: string, args: Array<Expression>, minArgs: number, maxArgs: number) {
            this.name = name;

            if ((maxArgs < minArgs) || (maxArgs < 0)) {
                throw new RangeError('\'maxArgs\' cannot be less than zero!');
            } 

            this.minArgs = minArgs;
            this.maxArgs = maxArgs;

            if (args.length > maxArgs) {
                throw new RangeError('size of \'args\' must be less than or equal to \'maxArgs\'!');
            }

            if (args.length < minArgs) {
                throw new RangeError('size of \'args\' must be greater than or equal to \'minArgs\'!');
            }

            this.args = args;
        }

        public abstract derivative(variable: string): Expression;

        public abstract simplify(knowns: Map<Variable, Value>): Expression;

        public structuralEquals(other: Expression): boolean {

            // Ensure that the other expression is a Function
            if (!(other instanceof Function)) {
                return false;
            }

            let otherFunction = other as Function;
            
            // Ensure that both functions have the same number of arguments, and the same names
            if ((this.args.length !== otherFunction.args.length) || (this.name !== otherFunction.name)) {
                return false;
            }

            // Ensure that all the arguments are equal
            for (let i = 0; i < this.args.length; i++) {
                if (this.args[i].structuralEquals(otherFunction.args[i])) {
                    return false;
                }
            }

            return true;
        }
    }
}