
export default interface BetterMap<K, V> {

	get(key: K): V | null;

	put(key: K, value: V | null): void;

	remove(key: K): boolean;

	has(key: K): boolean;

	keys(): Array<K>;

	values(): Array<V | null>;

	length(): number;
}