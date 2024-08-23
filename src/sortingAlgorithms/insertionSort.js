export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  for (let i = 1; i < array.length; i++) {
    let currentIndex = i;
    let currentValue = array[i];

    animations.push(['compare', currentIndex, currentIndex - 1]);

    while (currentIndex > 0 && array[currentIndex - 1] > currentValue) {
      animations.push(['compare', currentIndex - 1, currentIndex]);

      animations.push(['shift', currentIndex, currentIndex - 1]);
      array[currentIndex] = array[currentIndex - 1];

      currentIndex--;
      if (currentIndex > 0) {
        animations.push(['compare', currentIndex, currentIndex - 1]);
      }
    }

    animations.push(['place', currentIndex, currentValue]);
    array[currentIndex] = currentValue;

    animations.push(['final', i]);
  }

  for (let i = 0; i < array.length; i++) {
    animations.push(['wave', i]);
  }

  return animations;
}
