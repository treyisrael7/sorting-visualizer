export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  buildMaxHeap(array, animations);

  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    animations.push(['swap', 0, endIdx]);
    [array[0], array[endIdx]] = [array[endIdx], array[0]];

    animations.push(['final', endIdx]);
    heapify(array, 0, endIdx, animations);
  }

  animations.push(['final', 0]);

  for (let i = 0; i < array.length; i++) {
    animations.push(['wave', i]);
  }

  return animations;
}

function buildMaxHeap(array, animations) {
  const startIdx = Math.floor(array.length / 2 - 1);

  for (let i = startIdx; i >= 0; i--) {
    heapify(array, i, array.length, animations);
  }
}

function heapify(array, idx, heapSize, animations) {
  let largest = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;

  if (left < heapSize && array[left] > array[largest]) {
    animations.push(['compare', left, largest]);
    largest = left;
  }

  if (right < heapSize && array[right] > array[largest]) {
    animations.push(['compare', right, largest]);
    largest = right;
  }

  if (largest !== idx) {
    animations.push(['swap', idx, largest]);
    [array[idx], array[largest]] = [array[largest], array[idx]];
    heapify(array, largest, heapSize, animations);
  }
}
