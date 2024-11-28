import React, { useState, useEffect } from 'react';

function App() {
  const [tableData, setTableData] = useState([]);
  const [linksData, setLinksData] = useState([]);

  useEffect(() => {
    // Load data from data.json
    fetch('protein.json')
      .then(response => response.json())
      .then(data => setTableData(data));

    // Load links from links.json
    fetch('proteinlinks.json')
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
                  <th>Protein matrix</th>
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
    </div>
  );
}

export default App;
