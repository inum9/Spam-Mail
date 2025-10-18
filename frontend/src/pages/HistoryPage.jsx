import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import apiClient from "../apiClient"

const HistoryPage = () => {
  const [email, setEmail] = useState('');
  const [tests, setTests] = useState([]);

  const fetchHistory = async () => {
    if (!email) return;
    try {
      const res = await apiClient.get('/tests', { params: { userEmail: email } });
      setTests(res.data.data.tests);
    } catch {
      toast.error('Failed to load history');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-12">
      <h1 className="text-3xl mb-6 text-center">Test History</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border border-gray-300 rounded py-2 px-3 mb-6"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white rounded py-2 w-full hover:bg-indigo-700 mb-8"
        onClick={fetchHistory}
      >
        Load History
      </button>

      {tests.length === 0 && <p>No tests found for this email address.</p>}

      {tests.length > 0 && (
        <table className="w-full text-left border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">Test Code</th>
              <th className="border border-gray-300 px-3 py-2">Status</th>
              <th className="border border-gray-300 px-3 py-2">Score</th>
              <th className="border border-gray-300 px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {tests.map(test => (
              <tr key={test._id}>
                <td className="border border-gray-300 px-3 py-2 font-mono">{test.testCode}</td>
                <td className="border border-gray-300 px-3 py-2">{test.status}</td>
                <td className="border border-gray-300 px-3 py-2">{test.deliverabilityScore ?? '-'}</td>
                <td className="border border-gray-300 px-3 py-2">{new Date(test.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryPage;
