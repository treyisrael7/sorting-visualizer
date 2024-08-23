export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSort(array, 0, array.length - 1, animations);

  for (let i = 0; i < array.length; i++) {
    animations.push(['wave', i]);
  }

  return animations;
}

function quickSort(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSort(mainArray, startIdx, pivotIdx - 1, animations);
    quickSort(mainArray, pivotIdx + 1, endIdx, animations);
  }
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;

  animations.push(['pivot', endIdx]);

  for (let i = startIdx; i < endIdx; i++) {
    animations.push(['compare', i, endIdx]);

    if (mainArray[i] <= pivotValue) {
      animations.push(['swap', i, pivotIdx]);
      [mainArray[i], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[i]];
      pivotIdx++;
    }

    animations.push(['revert', i, endIdx]);
  }

  animations.push(['swap', pivotIdx, endIdx]);
  [mainArray[pivotIdx], mainArray[endIdx]] = [
    mainArray[endIdx],
    mainArray[pivotIdx]
  ];

  animations.push(['final', pivotIdx]);

  return pivotIdx;
}
