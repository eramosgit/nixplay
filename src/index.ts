import { findKthLargest } from "./kthLargest/kthLargest";
import { LRUCache } from "./lruCache/lruCache";

const runExample = () => {
  const nums = [3, 2, 1, 5, 6, 4];
  const k = 2;

  console.log(`The ${k}th largest element is:`, findKthLargest(nums, k));

  const cache = new LRUCache<string, number>(2);
  cache.put("1st", 1);
  cache.put("2nd", 2);
  cache.get("1st");
  cache.put("3rd", 3);
  const found = cache.get("2nd");
  console.log('The value for "2nd" is:', found);
};

runExample();
