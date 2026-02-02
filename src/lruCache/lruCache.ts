type Nullable<T> = T | null;

/**
 * Represents a node in a doubly linked list used by LRUCache.
 *
 * Stores the key, value, optional expiration timestamp, and pointers to
 * the previous and next nodes for O(1) insertion, deletion, and movement.
 *
 * @template K - Type of the key
 * @template V - Type of the value
 */
class Element<K, V> {
  key: K;
  value: V;
  expiration: number | null;
  prev: Nullable<Element<K, V>> = null;
  next: Nullable<Element<K, V>> = null;

  /**
   * @param key - The key associated with the value
   * @param value - The stored value
   * @param expiration - Optional expiration timestamp in milliseconds
   */
  constructor(key: K, value: V, expiration: number | null) {
    this.key = key;
    this.value = value;
    this.expiration = expiration;
  }
}

/**
 * LRU (Least Recently Used) Cache with optional TTL (Time-To-Live) per entry.
 *
 * Implements an O(1) get and put using a combination of:
 * - Map<K, Element<K, V>> for fast key-based access
 * - Doubly linked list for maintaining recency order
 *
 * Expired entries are removed lazily on access.
 *
 * @complexity
 * - get: O(1)
 * - put: O(1)
 * - Space: O(capacity)
 */
export class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, Element<K, V>>;
  private head: Element<K, V>;
  private tail: Element<K, V>;

  /**
   * Creates an LRUCache instance with the given capacity.
   *
   * @param capacity - Maximum number of items in the cache
   * @throws Error if capacity is negative
   */
  constructor(capacity: number) {
    if (capacity < 0) {
      throw new Error("Capacity must be >= 0");
    }
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Element<K, V>(null as any, null as any, null);
    this.tail = new Element<K, V>(null as any, null as any, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Inserts a key-value pair into the cache or updates an existing key.
   * Moves the key to the front to mark it as recently used.
   *
   * @param key - The key to store
   * @param value - The value to associate with the key
   * @param ttl - Optional time-to-live in milliseconds; if <= 0, treated as immediate expiration
   */
  put(key: K, value: V, ttl?: number): void {
    if (this.capacity === 0) {
      return;
    }
    const expiresAt =
      ttl === undefined ? null : ttl <= 0 ? Date.now() - 1 : Date.now() + ttl;
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      existing.expiration = expiresAt;
      this.moveToFront(existing);
      return;
    }
    if (this.map.size >= this.capacity) {
      this.removeLeastRecentlyUsed();
    }
    const node = new Element(key, value, expiresAt);
    this.map.set(key, node);
    this.addToFront(node);
  }

  /**
   * Retrieves a value by key from the cache.
   *
   * @param key - The key to look up
   * @returns The value associated with the key, or -1 if not found or expired
   */
  get(key: K): V | -1 {
    const node = this.map.get(key);
    if (!node) {
      return -1;
    }
    if (node.expiration !== null && Date.now() > node.expiration) {
      this.removeNode(node);
      this.map.delete(key);
      return -1;
    }
    this.moveToFront(node);
    return node.value;
  }

  /** @internal Adds a node right after the head (front of list) */
  private addToFront(element: Element<K, V>): void {
    element.prev = this.head;
    element.next = this.head.next;
    this.head.next!.prev = element;
    this.head.next = element;
  }

  /** @internal Removes a node from the linked list */
  private removeNode(element: Element<K, V>): void {
    element.prev!.next = element.next;
    element.next!.prev = element.prev;
  }

  /** @internal Moves a node to the front of the list */
  private moveToFront(element: Element<K, V>): void {
    this.removeNode(element);
    this.addToFront(element);
  }

  /** @internal Removes the least recently used node from cache */
  private removeLeastRecentlyUsed(): void {
    const lru = this.tail.prev!;
    if (lru === this.head) {
      return;
    }
    this.removeNode(lru);
    this.map.delete(lru.key);
  }
}
