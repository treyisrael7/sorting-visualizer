// 📁 SortingVisualizer.jsx
import React from 'react';
import {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations
} from '../sortingAlgorithms';
import { runAnimations } from './animations/runAnimations';
import {
  BASE_ANIMATION_SPEED_MS,
  MIN_ANIMATION_SPEED_MS,
  PRIMARY_COLOR
} from './constants';
import './SortingVisualizer.css';

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

  componentDidUpdate(prevProps) {
    if (prevProps.barCount !== this.props.barCount) {
      this.resetArray();
    }
  }

  getAnimationSpeed = () => {
    const { barCount } = this.props;
    const scalingFactor = Math.exp(barCount / 50);
    return Math.max(
      BASE_ANIMATION_SPEED_MS / scalingFactor,
      MIN_ANIMATION_SPEED_MS
    );
  };

  clearAllTimeouts = () => {
    this.animationTimeouts.forEach(clearTimeout);
    this.animationTimeouts = [];
  };

  addTimeout = (callback, delay) => {
    const timeoutID = setTimeout(callback, delay);
    this.animationTimeouts.push(timeoutID);
  };

  resetArray = () => {
    this.clearAllTimeouts();
    const array = Array.from({ length: this.props.barCount }, () =>
      randomIntFromInterval(5, 400)
    );
    this.setState({ array }, this.resetBarColors);
  };

  resetBarColors = () => {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let bar of arrayBars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
  };

  handleSort = (type) => {
    const map = {
      merge: getMergeSortAnimations,
      quick: getQuickSortAnimations,
      heap: getHeapSortAnimations,
      bubble: getBubbleSortAnimations,
      selection: getSelectionSortAnimations,
      insertion: getInsertionSortAnimations
    };

    const getAnimations = map[type];
    if (!getAnimations) return;

    const animations = getAnimations(this.state.array);
    runAnimations(
      animations,
      this.getAnimationSpeed,
      this.addTimeout,
    );
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
          <button onClick={() => this.handleSort('merge')}>Merge Sort</button>
          <button onClick={() => this.handleSort('quick')}>Quick Sort</button>
          <button onClick={() => this.handleSort('heap')}>Heap Sort</button>
          <button onClick={() => this.handleSort('bubble')}>Bubble Sort</button>
          <button onClick={() => this.handleSort('selection')}>
            Selection Sort
          </button>
          <button onClick={() => this.handleSort('insertion')}>
            Insertion Sort
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
