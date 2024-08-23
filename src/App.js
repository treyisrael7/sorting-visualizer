import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import { useState } from 'react';

function App() {
  const [barCount, setBarCount] = useState(150);

  const handleScrollChange = (event) => {
    setBarCount(event.target.value);
  };

  return (
    <div className="App">
      <div className="title-container">
        <h1 className="title">Sorting Visualizer</h1>
        <div className="scroll-container">
          <div className="scroll-label">{barCount} Array Bars</div>
          <div className="scrollbar-wrapper">
            <input
              type="range"
              min="10"
              max="450"
              step="10"
              value={barCount}
              className="scrollbar"
              id="barCountSlider"
              onChange={handleScrollChange}
            />
          </div>
        </div>
      </div>
      <SortingVisualizer barCount={barCount} />
    </div>
  );
}

export default App;
