import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [fullName, setFullName] = useState('Soham Mandal');
  const [dob, setDob] = useState('14-10-2003');
  const [email, setEmail] = useState('soham@example.com');
  const [rollNumber, setRollNumber] = useState('ABCD123');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const payload = {
        full_name: fullName,
        dob: dob,
        email: email,
        roll_number: rollNumber,
        data: JSON.parse(jsonInput)
      };
      
      const res = await fetch('https://your-backend-url.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
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
    <div>
      <h1>{response?.roll_number}</h1>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Date of Birth (DD-MM-YYYY)"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <textarea
        rows="10"
        cols="50"
        placeholder="Enter JSON here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

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
    </div>
  );
}

export default App;
