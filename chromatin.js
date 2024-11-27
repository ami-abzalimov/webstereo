import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tableData, setTableData] = useState([]);
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    fetch('chromatin.json')
      .then(response => response.json())
      .then(data => setTableData(data));

    fetch('chromatinlinks.json')
      .then(response => response.json())
      .then(links => setLinksData(links));
  }, []);

  return (
      <main>
        <div className="container">
          <div className="first-column">
            <table className="table">
              <thead>
                <tr>
                  <th className="first-row"></th>
                  {tableData[0] && tableData[0].values.map((col, index) => (
                    <th key={index} className="first-row">{col}</th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Chromatin matrix</th>
                  {tableData[0] && tableData[0].values.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.name}</td>
                    {row.values.map((value, cellIndex) => (
                      <td key={cellIndex}>
                        {linksData[rowIndex] && linksData[rowIndex].links[cellIndex] ? (
                          <a href={linksData[rowIndex].links[cellIndex]}>
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
  );
}

export default App;