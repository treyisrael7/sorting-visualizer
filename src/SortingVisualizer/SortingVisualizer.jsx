import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/quickSort.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/heapSort.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort.js';
import { getSelectionSortAnimations } from '../sortingAlgorithms/selectionSort.js';
import { getInsertionSortAnimations } from '../sortingAlgorithms/insertionSort.js';
import './SortingVisualizer.css';

const BASE_ANIMATION_SPEED_MS = 300;
const MIN_ANIMATION_SPEED_MS = 2;
const COLOR_CHANGE_DURATION_MS = 500;

const PRIMARY_COLOR = '#244855';
const COMPARE_COLOR = '#FFB200';
const SWAP_COLOR = '#874F41';
const FINAL_COLOR = '#4CAF50';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
    this.animationTimeouts = [];
  }

  componentDidMount() {
    this.resetArray();
  }

  getAnimationSpeed = () => {
    const { barCount } = this.props;
    const scalingFactor = Math.exp(barCount / 50);
    const animationSpeed = Math.max(
      BASE_ANIMATION_SPEED_MS / scalingFactor,
      MIN_ANIMATION_SPEED_MS
    );
    console.log(
      `Bar Count: ${barCount}, Scaling Factor: ${scalingFactor}, Animation Speed: ${animationSpeed}`
    );
    return animationSpeed;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.barCount !== this.props.barCount) {
      this.resetArray();
    }
  }

  resetArray = () => {
    this.clearAllTimeouts();

    const array = Array.from({ length: this.props.barCount }, () =>
      randomIntFromInterval(5, 400)
    );
    this.setState({ array });

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  };

  handleNumBarsChange = (event) => {
    this.setState({ numBars: Number(event.target.value) }, this.resetArray);
  };

  clearAllTimeouts = () => {
    this.animationTimeouts.forEach((timeoutID) => clearTimeout(timeoutID));
    this.animationTimeouts = [];
  };

  addTimeout = (callback, delay) => {
    const timeoutID = setTimeout(callback, delay);
    this.animationTimeouts.push(timeoutID);
  };

  mergeSort = () => {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const ANIMATION_SPEED_MS = this.getAnimationSpeed();

    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoOrHeight] = animation;
      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle =
        barTwoOrHeight !== undefined ? arrayBars[barTwoOrHeight]?.style : null;

      const colorChangeDelay = i * ANIMATION_SPEED_MS;

      switch (action) {
        case 'compare':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'overwrite':
          this.addTimeout(() => {
            barOneStyle.height = `${barTwoOrHeight}px`;
            barOneStyle.backgroundColor = SWAP_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'wave':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;

        default:
          break;
      }
    });
  };

  quickSort = () => {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const ANIMATION_SPEED_MS = this.getAnimationSpeed();

    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoIdx] = animation;
      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle =
        barTwoIdx !== undefined ? arrayBars[barTwoIdx]?.style : null;

      const colorChangeDelay = i * ANIMATION_SPEED_MS;

      switch (action) {
        case 'pivot':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = '#FF6363';
          }, colorChangeDelay);
          break;

        case 'compare':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, colorChangeDelay);
          break;

        case 'revert':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay);
          break;

        case 'swap':
          this.addTimeout(() => {
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
            barOneStyle.backgroundColor = SWAP_COLOR;
            barTwoStyle.backgroundColor = SWAP_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'final':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);
          break;

        case 'wave':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;

        default:
          break;
      }
    });
  };

  heapSort = () => {
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const ANIMATION_SPEED_MS = this.getAnimationSpeed();

    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoIdx] = animation;
      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle =
        barTwoIdx !== undefined ? arrayBars[barTwoIdx]?.style : null;

      const colorChangeDelay = i * ANIMATION_SPEED_MS;

      switch (action) {
        case 'compare':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'swap':
          this.addTimeout(() => {
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
            barOneStyle.backgroundColor = SWAP_COLOR;
            barTwoStyle.backgroundColor = SWAP_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'final':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);
          break;

        case 'wave':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;

        default:
          break;
      }
    });
  };

  bubbleSort = () => {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const ANIMATION_SPEED_MS = this.getAnimationSpeed();

    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoIdx] = animation;
      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle =
        barTwoIdx !== undefined ? arrayBars[barTwoIdx]?.style : null;

      const colorChangeDelay = i * ANIMATION_SPEED_MS;

      switch (action) {
        case 'compare':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, colorChangeDelay);

          break;

        case 'swap':
          this.addTimeout(() => {
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
            barOneStyle.backgroundColor = SWAP_COLOR;
            barTwoStyle.backgroundColor = SWAP_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'no-swap':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'final':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);
          break;

        case 'wave':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;

        default:
          break;
      }
    });
  };

  selectionSort = () => {
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const ANIMATION_SPEED_MS = this.getAnimationSpeed();

    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoIdx] = animation;
      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle =
        barTwoIdx !== undefined ? arrayBars[barTwoIdx]?.style : null;

      const colorChangeDelay = i * ANIMATION_SPEED_MS;

      switch (action) {
        case 'compare':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'swap':
          this.addTimeout(() => {
            const tempHeight = barOneStyle.height;
            barOneStyle.height = barTwoStyle.height;
            barTwoStyle.height = tempHeight;
            barOneStyle.backgroundColor = SWAP_COLOR;
            barTwoStyle.backgroundColor = SWAP_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'final':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);
          break;

        case 'wave':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;

        default:
          break;
      }
    });
  };

  insertionSort = () => {
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const ANIMATION_SPEED_MS = this.getAnimationSpeed();

    animations.forEach((animation, i) => {
      const [action, barOneIdx, barTwoIdxOrValue] = animation;
      const barOneStyle = arrayBars[barOneIdx]?.style;
      const barTwoStyle =
        barTwoIdxOrValue !== undefined
          ? arrayBars[barTwoIdxOrValue]?.style
          : null;

      const colorChangeDelay = i * ANIMATION_SPEED_MS;

      switch (action) {
        case 'compare':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'shift':
          this.addTimeout(() => {
            barOneStyle.height = `${barTwoStyle.height}`;
            barOneStyle.backgroundColor = SWAP_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'place':
          this.addTimeout(() => {
            barOneStyle.height = `${barTwoIdxOrValue}px`;
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS);
          break;

        case 'final':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);
          break;

        case 'wave':
          this.addTimeout(() => {
            barOneStyle.backgroundColor = FINAL_COLOR;
          }, colorChangeDelay);

          this.addTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, colorChangeDelay + COLOR_CHANGE_DURATION_MS * 1.5);
          break;

        default:
          break;
      }
    });
  };

  render() {
    const { array } = this.state;
    const { barCount } = this.props;

    const barWidth = 100 / barCount;

    return (
      <div>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${barWidth}%`
              }}
            ></div>
          ))}
        </div>
        <div className="controls">
          <button onClick={this.resetArray}>Generate New Array</button>
          <button onClick={this.mergeSort}>Merge Sort</button>
          <button onClick={this.quickSort}>Quick Sort</button>
          <button onClick={this.heapSort}>Heap Sort</button>
          <button onClick={this.bubbleSort}>Bubble Sort</button>
          <button onClick={this.selectionSort}>Selection Sort</button>
          <button onClick={this.insertionSort}>Insertion Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
