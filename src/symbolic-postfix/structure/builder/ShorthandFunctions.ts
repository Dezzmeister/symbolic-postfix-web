import Addition from "../operations/Addition";
import Expression from "../Expression";
import Multiplication from "../operations/Multiplication";

/*
	Shorthand functions to help build Expression trees.
*/

/**
 * Multiplies the given arguments.
 * 
 * @param {Array<Expression>} args operands
 * @return {Multiplication} the operands, multiplied together
 */
export function multiply(args: Array<Expression>): Multiplication {
	return new Multiplication(args);
}

/**
 * Adds the given arguments.
 * 
 * @param {Array<Expression} args addends
 * @return {Addition} the addends, added together
 */
export function plus(args: Array<Expression>): Addition {
	return new Addition(args);
}