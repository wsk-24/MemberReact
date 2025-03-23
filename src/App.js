import React, { useState } from 'react';
import './button.css'; // นำเข้า CSS
import Register from './Register';

function App() {
  const [response, setResponse] = useState(null);


  const registerUser = async () => {
    const url = 'http://127.0.0.1:5000/register';
    const data = {
      id: 10,
      username: 'worasak',
      password: '1234',
      email: 'worasak@test.com',
    };
  
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const result = await res.json();
      setResponse(result);  // Save the response from API
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    // <div className="App">
    //   <button className="button" onClick={registerUser}>Register</button>
    //   {response && (
    //     <div className="response">
    //       <h3>Response from API:</h3>
    //       <pre>{JSON.stringify(response, null, 2)}</pre>
    //     </div>
    //   )}
    // </div>
    <div className='App'>
        <Register/>
    </div>
  );
}

export default App;
