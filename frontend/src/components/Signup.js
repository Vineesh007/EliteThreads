// import React from 'react';
// import { Link } from 'react-router-dom';

// const Signup = () => {
//   return (
//     <div className="flex min-h-screen">
//       <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603788983187-7a03478c8f53')" }}></div>
//       <div className="w-1/2 flex flex-col justify-center items-center p-8">
//         <h2 className="text-4xl font-bold mb-4">Create an Account</h2>
//         <p className="mb-8 text-gray-600">Enter your details to get started</p>
//         <input type="text" placeholder="Full Name" className="w-80 mb-4 p-3 border rounded-md" />
//         <input type="email" placeholder="Email" className="w-80 mb-4 p-3 border rounded-md" />
//         <input type="password" placeholder="Password" className="w-80 mb-4 p-3 border rounded-md" />
//         <button className="w-80 p-3 bg-green-600 text-white rounded-md hover:bg-green-700">Sign Up</button>
//         <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-600">Sign In</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the CSS for styling

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const signupResponse = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });

      alert(signupResponse.data.message);
      navigate('/login');  // Redirect to login after signup

    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;





