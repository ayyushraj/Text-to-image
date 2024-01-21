import React, { useState, useEffect } from 'react';

function App() {
 const [text, setText] = useState("");
 const [generatedText, setGeneratedText] = useState("");

 const generateText = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setGeneratedText(data.text);
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <div>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={generateText}>Generate Text</button>
      <p>{generatedText}</p>
    </div>
 );
}

export default App;
