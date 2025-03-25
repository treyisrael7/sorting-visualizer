// 📁 runAnimations.js
import {
    COMPARE_COLOR,
    SWAP_COLOR,
    FINAL_COLOR,
    PRIMARY_COLOR,
    COLOR_CHANGE_DURATION_MS,
  } from '../constants';
  
  export function runAnimations(animations, getSpeed, addTimeout) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const speed = getSpeed();
  
    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoOrValue] = animation;
      const barOne = arrayBars[barOneIdx];
      const barTwo =
        typeof barTwoOrValue === 'number' ? arrayBars[barTwoOrValue] : null;
      const delay = i * speed;
  
      switch (action) {
        case 'compare':
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = COMPARE_COLOR;
            if (barTwo) barTwo.style.backgroundColor = COMPARE_COLOR;
          }, delay);
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
            if (barTwo) barTwo.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS);
          break;
  
        case 'swap':
          addTimeout(() => {
            if (barOne && barTwo) {
              const temp = barOne.style.height;
              barOne.style.height = barTwo.style.height;
              barTwo.style.height = temp;
              barOne.style.backgroundColor = SWAP_COLOR;
              barTwo.style.backgroundColor = SWAP_COLOR;
            }
          }, delay);
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
            if (barTwo) barTwo.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS);
          break;
  
        case 'overwrite':
          addTimeout(() => {
            if (barOne) {
              barOne.style.height = `${barTwoOrValue}px`;
              barOne.style.backgroundColor = SWAP_COLOR;
            }
          }, delay);
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS);
          break;
  
        case 'place':
          addTimeout(() => {
            if (barOne) {
              barOne.style.height = `${barTwoOrValue}px`;
              barOne.style.backgroundColor = FINAL_COLOR;
            }
          }, delay);
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS);
          break;
  
        case 'final':
        case 'wave':
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = FINAL_COLOR;
          }, delay);
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;
  
        case 'revert':
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
            if (barTwo) barTwo.style.backgroundColor = PRIMARY_COLOR;
          }, delay);
          break;
  
        case 'pivot':
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = '#FF6363';
          }, delay);
          break;
  
        case 'no-swap':
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
            if (barTwo) barTwo.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS);
          break;
  
        case 'shift':
          addTimeout(() => {
            if (barOne && barTwo) {
              barOne.style.height = barTwo.style.height;
              barOne.style.backgroundColor = SWAP_COLOR;
            }
          }, delay);
          addTimeout(() => {
            if (barOne) barOne.style.backgroundColor = PRIMARY_COLOR;
          }, delay + COLOR_CHANGE_DURATION_MS);
          break;
  
        default:
          break;
      }
    });
  
    addTimeout(() => animations.length * speed);
  }
  