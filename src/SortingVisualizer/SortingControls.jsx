import React from 'react';

export default function SortingControls({ onReset, onSort }) {
  return (
    <div className="controls">
      <button onClick={onReset}>
        Generate New Array
      </button>
      <button onClick={() => onSort('merge')}>
        Merge Sort
      </button>
      <button onClick={() => onSort('quick')}>
        Quick Sort
      </button>
      <button onClick={() => onSort('heap')}>
        Heap Sort
      </button>
      <button onClick={() => onSort('bubble')}>
        Bubble Sort
      </button>
      <button onClick={() => onSort('selection')}>
        Selection Sort
      </button>
      <button onClick={() => onSort('insertion')}>
        Insertion Sort
      </button>
    </div>
  );
}
