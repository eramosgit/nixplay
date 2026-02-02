import assert from "assert";
import { LRUCache } from "./lruCache";

(async () => {
  /* Basic put and get functions */
  const cache = new LRUCache<string, number>(2);
  cache.put("1st", 1);
  cache.put("2nd", 2);
  assert.strictEqual(cache.get("1st"), 1);
  assert.strictEqual(cache.get("2nd"), 2);

  /* LRU removal */
  cache.get("1st"); // a becomes MRU
  cache.put("3rd", 3); // removes b
  assert.strictEqual(cache.get("2nd"), -1);
  assert.strictEqual(cache.get("1st"), 1);
  assert.strictEqual(cache.get("3rd"), 3);

  /* TTL expiration */
  const ttlCache = new LRUCache<string, number>(2);
  ttlCache.put("1st", 10, 50); // expires in 50ms
  await new Promise((r) => setTimeout(r, 60));
  assert.strictEqual(ttlCache.get("1st"), -1);
  ttlCache.put("2nd", 20); // TTL does not affect other entries
  assert.strictEqual(ttlCache.get("2nd"), 20);
  ttlCache.put("3rd", 30, -100); // expires immediately
  assert.strictEqual(ttlCache.get("3rd"), -1);

  /* Capacity */
  const zeroCache = new LRUCache<string, number>(0);
  zeroCache.put("E", 1);
  assert.strictEqual(zeroCache.get("E"), -1);
  assert.throws(() => new LRUCache<string, number>(-1));

  /* Update existing key */
  const updateCache = new LRUCache<string, number>(1);
  updateCache.put("Exist", 1);
  updateCache.put("Exist", 2);
  assert.strictEqual(updateCache.get("Exist"), 2);

  console.log("All lruCache module tests passed.");
})();
