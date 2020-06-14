import Hashable from "./Hashable";
import BetterMap from "./BetterMap";
import LinkedList from "./LinkedList";
import EqualComparable from "./EqualComparable";

class Entry<K extends EqualComparable, V> implements EqualComparable {
	key: K;
	value: V | null;

	constructor(key: K, value: V | null) {
		this.key = key;
		this.value = value;
	}

	equals(other: EqualComparable): boolean {
		let entry = other as Entry<K, V>;
		
		return (this.key.equals(entry.key));
	}
}

/**
 * A hashmap implementation using separate chaining with LinkedLists.
 * 
 * @author Joe Desmond
 */
export default class HashMap<K extends Hashable, V> implements BetterMap<K, V> {

	/**
	 * 
	 */
	public static readonly DEFAULT_BUCKET_COUNT = 16;
	public static readonly DEFAULT_LOAD_FACTOR = 0.75;

	private buckets:Array<LinkedList<Entry<K, V>>>;
	private loadFactor:number;
	private size:number;

	constructor(bucketCount?: number, loadFactor?: number) {
		let initBucketCount = HashMap.DEFAULT_BUCKET_COUNT;
		let initLoadFactor = HashMap.DEFAULT_LOAD_FACTOR;

		if (bucketCount !== undefined) {
			initBucketCount = bucketCount;
		}

		if (loadFactor !== undefined) {
			initLoadFactor = loadFactor;
		}

		if (initLoadFactor <= 0.4) {
			throw new Error("Load factor is too low! The load factor must be greater than 0.4");
		}

		this.buckets = new Array<LinkedList<Entry<K, V>>>(initBucketCount);

		for (let i = 0; i < this.buckets.length; i++) {
			this.buckets[i] = new LinkedList<Entry<K, V>>();
		}

		this.loadFactor = initLoadFactor;
		this.size = 0;
	}

	get(key: K): V | null {
		let hashcode = key.hashcode();
		let bucketIndex = hashcode % this.buckets.length;
		
		let bucket = this.buckets[bucketIndex];
		
		for (let entry of bucket) {
			if (key.equals(entry.key)) {
				return entry.value;
			}
		}

		return null;
	}

	private rehash(): void {
		let newBuckets = new Array<LinkedList<Entry<K, V>>>(this.buckets.length * 2);

		for (let i = 0; i < newBuckets.length; i++) {
			newBuckets[i] = new LinkedList<Entry<K, V>>();
		}

		let oldBuckets = this.buckets;
		this.buckets = newBuckets;
		this.size = 0;

		for (let i = 0; i < oldBuckets.length; i++) {
			for (let entry of oldBuckets[i]) {
				this.put(entry.key, entry.value);
			}
		}
	}

	put(key: K, value: V | null): void {
		if ((this.size + 1) > (this.buckets.length * this.loadFactor)) {
			this.rehash();
		}

		let newEntry:Entry<K, V> = new Entry<K, V>(key, value);

		let hashcode = key.hashcode();
		let bucketIndex = hashcode % this.buckets.length;
		let bucket = this.buckets[bucketIndex];

		for (let entry of bucket) {
			if (entry.equals(newEntry)) {
				entry.value = value;
				return;
			}
		}

		bucket.push(newEntry);
		this.size++;
	}

	remove(key: K): boolean {
		let entryToRemove = new Entry<K, V>(key, null);
		let bucket = this.buckets[key.hashcode() % this.buckets.length];

		if (bucket.remove(entryToRemove)) {
			this.size--;
			return true;
		}

		return false;
	}

	has(key: K): boolean {
		let entry = new Entry<K, V>(key, null);
		let bucket = this.buckets[key.hashcode() % this.buckets.length];

		return bucket.has(entry);
	}

	keys(): K[] {
		let out = new Array<K>();

		for (let bucket of this.buckets) {
			for (let entry of bucket) {
				out.push(entry.key);
			}
		}

		return out;
	}

	values(): (V | null)[] {
		let out = new Array<V | null>();

		for (let bucket of this.buckets) {
			for (let entry of bucket) {
				out.push(entry.value);
			}
		}

		return out;
	}

	length(): number {
		return this.size;
	}
}