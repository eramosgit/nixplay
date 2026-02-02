/**
 * Finds the Kth largest element in an array using the QuickSelect algorithm.
 *
 * @param nums - The array of numbers to search
 * @param k - The 1-based index representing the Kth largest element to find
 * @returns The Kth largest element in the array
 *
 * @throws Error if the input array is invalid or empty
 * @throws Error if k is less than 1 or greater than the input array length
 */
export const findKthLargest = (nums: number[], k: number): number => {
  if (!Array.isArray(nums) || nums.length === 0) {
    throw new Error("Specified nums array is invalid.");
  }
  if (k < 1 || k > nums.length) {
    throw new Error("Specified k value is invalid");
  }
  const targetIndex = nums.length - k;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const pivotIndex = partition(nums, left, right);
    if (pivotIndex === targetIndex) return nums[pivotIndex];
    pivotIndex < targetIndex
      ? (left = pivotIndex + 1)
      : (right = pivotIndex - 1);
  }
  throw new Error("Encountered an unexpected error.");
};

/**
 * Partitions an array segment around a pivot element.
 *
 * @param nums - The array of numbers to be partitioned
 * @param left - The starting index of the segment to partition (inclusive)
 * @param right - The ending index of the segment to partition (inclusive)
 * @returns The final index position of the pivot after partitioning
 */
const partition = (nums: number[], left: number, right: number): number => {
  const pivot = nums[right];
  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if (nums[i] < pivot) {
      swap(nums, i, storeIndex);
      storeIndex++;
    }
  }
  swap(nums, storeIndex, right);
  return storeIndex;
};

/**
 * Swaps two elements in an array using destructuring.
 *
 * @param nums - The array containing the elements to swap
 * @param first - The index of the first element
 * @param second - The index of the second element
 */
const swap = (nums: number[], first: number, second: number): void => {
  [nums[first], nums[second]] = [nums[second], nums[first]];
};
