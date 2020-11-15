import React from 'react';
import './App.css';
import { PlotContainer } from './components/Scatterplot';

const mockData = [
  { day: '2017-04-18', productPerceivedQuality: '2.8' },
  { day: '2017-04-19', productPerceivedQuality: '2.9' },
  { day: '2017-04-20', productPerceivedQuality: '2.7' },
  { day: '2017-04-21', productPerceivedQuality: '4.3' },
  { day: '2017-04-22', productPerceivedQuality: '4.6' },
  { day: '2017-04-23', productPerceivedQuality: '5' },
  { day: '2017-04-24', productPerceivedQuality: '5.2' },
  { day: '2017-04-25', productPerceivedQuality: '5.1' },
  { day: '2017-04-26', productPerceivedQuality: '4.8' },
  { day: '2017-04-27', productPerceivedQuality: '4.9' },
  { day: '2017-04-28', productPerceivedQuality: '5.1' },
  { day: '2017-04-29', productPerceivedQuality: '5.3' },
  { day: '2017-04-30', productPerceivedQuality: '5.6' },
  { day: '2017-05-01', productPerceivedQuality: '6.2' },
];

// This guy is not good enough at TypeScript
// ttps://hackernoon.com/how-and-why-to-use-d3-with-react-d239eb1ea274
function App() {
  return (
    <div className="App">
      <PlotContainer
        data={mockData}
        height={40}
        selectX={datum => new Date(datum.day)}
        selectY={datum => parseFloat(datum.productPerceivedQuality)}
        width={200}
      />
    </div>
  );
}

export default App;
