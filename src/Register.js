import React, { useState } from 'react';
import './register.css'; // หรือใช้ styled-components ถ้าต้องการ

function Register() {
  const [formData, setFormData,setResponse] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showDialog, setShowDialog,setShowErrorDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onRegisted = async (e) => {
    console.log("formData",formData);
    // console.log("username",username);
    const url = 'http://127.0.0.1:5000/register';
    const data = {
      id: 22,
      username: formData.username,
      password: formData.password,
      email: formData.email,
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

      setShowDialog(true);
    //   setResponse(result);  // Save the response from API
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const closeDialog = () => {
    setShowDialog(false);
    // รีเซ็ตฟอร์มหลังปิด Dialog (ถ้าต้องการ)
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    // console.log("Before validation - formData:", formData.username);
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    onRegisted(16,formData.username,formData.password,formData.email)
    console.log('Form Data:', formData);
    console.log("handleSubmit","username :"+username);

    setError('');
    // alert('Registration successful!');
    // Add your API call or registration logic here

   

    
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Registration Complete!</h3>
            <p>Your account has been successfully created.</p>
            <button onClick={closeDialog} className="dialog-btn">OK</button>
          </div>
        </div>
      )}

    </div>

    


  );
}

export default Register;