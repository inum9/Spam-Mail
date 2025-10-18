import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiClient from '../apiClient';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const response = await apiClient.get(`/tests/${testId}`);
      setTest(response.data.data);
      if (response.data.data.status === 'completed') {
        navigate(`/report/${testId}`);
      }
    } catch (err) {
      toast.error('Failed to load test');
    } finally {
      setLoading(false);
    }
  };

  const startCheck = async () => {
    setChecking(true);
    try {
      await apiClient.post(`/tests/${testId}/check`);
      toast.success('Test check started!');
      // Poll periodically or navigate to report after delay
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to start test check');
    } finally {
      setChecking(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 mt-12 text-center">
      <h2 className="text-xl mb-4">Your Test Code</h2>
      <div className="mb-6 text-indigo-700 font-mono text-3xl">{test.testCode}</div>
      <p className="mb-4">Send an email to the listed inboxes with this code in the subject or body.</p>
      <ul className="mb-6 list-disc list-inside text-left">
        {test.results.map((inbox, i) => (
          <li key={i} className="text-gray-700">
            {inbox.email}
          </li>
        ))}
      </ul>
      {test.status === 'pending' && (
        <button
          onClick={startCheck}
          disabled={checking}
          className="bg-indigo-600 text-white rounded py-3 px-4 hover:bg-indigo-700 transition"
        >
          {checking ? 'Starting...' : 'Start Check'}
        </button>
      )}
      {test.status === 'processing' && <p className="text-yellow-500">Processing test... Please wait.</p>}
    </div>
  );
};

export default TestPage;
