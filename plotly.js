import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

function App() {
  const [heatData, setHeatData] = useState([]);
  const [linksHeatData, setLinksHeatData] = useState([]);

  useEffect(() => {
    // Load data from heat.json
    fetch('heat.json')
      .then(response => response.json())
      .then(data => setHeatData(data));

    // Load links from linksheat.json
    fetch('linksheat.json')
      .then(response => response.json())
      .then(links => setLinksHeatData(links));
  }, []);

  useEffect(() => {
    if (heatData.length > 0) {
      const heatmapData = {
        z: heatData,
        x: heatData[0].map((_, i) => `X${i + 1}`),
        y: heatData.map((_, i) => `Y${i + 1}`),
        type: 'heatmap',
        hovertemplate: '%{x} | %{y} <br> %{z}',
        hoverinfo: 'x+y+z',
        text: linksHeatData.map((row, i) =>
          row.map((link, j) => 
            link ? `<a href="${link}">${heatData[i][j]}</a>` : heatData[i][j]
          )
        ),
        texttemplate: '%{text}',
        colorscale: 'Viridis',
        showscale: true,
      };

      Plotly.newPlot('heatmap-container', [heatmapData], {
        margin: { l: 150, r: 50, b: 50, t: 30 },
        xaxis: {
          autorange: true,
          showgrid: true,
          zeroline: false,
          title: 'X Axis',
        },
        yaxis: {
          autorange: true,
          showgrid: true,
          zeroline: false,
          title: 'Y Axis',
        },
        scrollZoom: true,
        showlegend: false,
      });
    }
  }, [heatData, linksHeatData]);

  return (
    <div className="app">
      {/* Include navigation from everything.js */}
      <div id="navigation"></div>
      <main>
        <div id="heatmap-container"></div>
      </main>
    </div>
  );
}

export default App;
