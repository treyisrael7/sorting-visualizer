export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);

  for (let i = 0; i < array.length; i++) {
    animations.push(['wave', i]);
  }
  
  return animations;
}

function mergeSort(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx,
    i = startIdx,
    j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    animations.push(['compare', i, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push(['overwrite', k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push(['overwrite', k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while (i <= middleIdx) {
    animations.push(['compare', i, i]);

    animations.push(['overwrite', k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push(['compare', j, j]);

    animations.push(['overwrite', k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
