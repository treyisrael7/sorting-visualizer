export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push(['compare', j, j + 1]);

      if (array[j] > array[j + 1]) {
        animations.push(['swap', j, j + 1]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      } else {
        animations.push(['no-swap', j, j + 1]);
      }
    }
    animations.push(['final', array.length - i - 1]);

    if (!swapped) break;
  }

  for (let i = 0; i < array.length; i++) {
    animations.push(['wave', i]);
  }

  return animations;
}
