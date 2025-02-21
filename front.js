import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonInput = JSON.parse(input);
      const res = await fetch('https://your-backend-url/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('Invalid JSON input');
    }
  };

  const handleFilterChange = (e) => {
    const options = [...e.target.selectedOptions].map(option => option.value);
    setSelectedFilters(options);
  };

  const filteredResponse = () => {
    if (!response) return null;
    const filtered = {};
    if (selectedFilters.includes('numbers')) filtered.numbers = response.numbers;
    if (selectedFilters.includes('alphabets')) filtered.alphabets = response.alphabets;
    if (selectedFilters.includes('highest_alphabet')) filtered.highest_alphabet = response.highest_alphabet;
    return filtered;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <div>
            <h2>Filtered Response</h2>
            <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
