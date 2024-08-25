import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      // Parse the JSON input to ensure it's valid
      const payload = JSON.parse(jsonInput);

      // Make sure the payload is in the expected format
      if (!payload.data || !Array.isArray(payload.data)) {
        setError('Invalid JSON format. Expected format: { "data": ["A", "C", "z"] }');
        return;
      }

      // Send the request to your Flask backend
      const res = await fetch('http://127.0.0.1:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });

      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setError('Invalid JSON format. Please correct the input and try again.');
    }
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  const filteredResponse = response
    ? {
        numbers: selectedOptions.includes('Numbers') ? response.numbers : null,
        alphabets: selectedOptions.includes('Alphabets') ? response.alphabets : null,
        highest_lowercase_alphabet: selectedOptions.includes('Highest lowercase alphabet')
          ? response.highest_lowercase_alphabet
          : null,
      }
    : null;

  return (
    <div className="App">
      <header className="App-header">
        <h1>{response?.roll_number}</h1>
        <textarea
          rows="10"
          cols="50"
          placeholder='Enter JSON here... Example: { "data": ["A", "C", "z"] }'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {response && (
          <div>
            <h2>Response:</h2>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Numbers"
                  onChange={handleOptionChange}
                />
                Numbers
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Alphabets"
                  onChange={handleOptionChange}
                />
                Alphabets
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Highest lowercase alphabet"
                  onChange={handleOptionChange}
                />
                Highest lowercase alphabet
              </label>
            </div>
            <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
