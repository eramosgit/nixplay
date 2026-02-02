import assert from "assert";
import { findKthLargest } from "./kthLargest";

(async () => {
  // Test cases based on the examples provided
  assert.strictEqual(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
  assert.strictEqual(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);

  // Invalid input tests part of evaluation criteria
  assert.throws(() => findKthLargest([], 1));
  assert.throws(() => findKthLargest([1, 2, 3], 0));

  console.log("All kthLargest module tests passed.");
})();
