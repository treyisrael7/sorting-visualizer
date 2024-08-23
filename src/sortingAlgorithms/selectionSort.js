export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    animations.push(['compare', minIndex, minIndex]);

    for (let j = i + 1; j < array.length; j++) {
      animations.push(['compare', minIndex, j]);

      if (array[j] < array[minIndex]) {
        animations.push(['compare', minIndex, j]);
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      animations.push(['swap', i, minIndex]);
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    } else {
      animations.push(['no-swap', i, minIndex]);
    }

    animations.push(['final', i]);
  }

  animations.push(['final', array.length - 1]);

  for (let i = 0; i < array.length; i++) {
    animations.push(['wave', i]);
  }

  return animations;
}
