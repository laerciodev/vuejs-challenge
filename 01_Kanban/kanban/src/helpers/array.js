// Make sure a valid array is provided
const isValidArray = arr => {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    throw new Error("Please provide a valid array");
  }
};

// Make sure there's an item to move
const hasItem = (item, from) => {
  if (!item.length) {
    throw new Error("There is no item in the array at index " + from);
  }
};

export const moveInsideArray = (arr, from, to) => {
  // Make sure a valid array is provided
  isValidArray(arr);

  // Delete the item from it's current position
  const item = arr.splice(from, 1);

  hasItem(item, from);

  // Move the item to its new position
  arr.splice(to, 0, item[0]);
};

export const moveBetweenArray = (srcArr, targetArr, from, to) => {
  [srcArr, targetArr].map(arr => isValidArray(arr));

  // Delete the item at the source array
  const item = srcArr.splice(from, 1);
  hasItem(item, from);

  targetArr.splice(to, 0, item[0]);
};
