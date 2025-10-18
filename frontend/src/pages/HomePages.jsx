import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Email is required');
      return;
    }
    // Call your create test API here and navigate on success
    navigate('/test/12345'); // example navigation
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 mt-12">
      <h1 className="text-3xl font-semibold mb-4 text-center">Test Your Email Deliverability</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 mb-6"
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white rounded py-3 font-semibold hover:bg-indigo-700 transition-colors"
        >
          Start Test
        </button>
      </form>
    </div>
  );
};

export default HomePage;
