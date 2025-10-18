// src/pages/HistoryPage.jsx
import { useState } from 'react';
import Card from '../component/Card';
import Input from '../component/Input';
import Button from "../component/Button"
import { Link } from 'react-router-dom';
import api from '../apiClient';

const HistoryPage = () => {
  const [email, setEmail] = useState('');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) return;
    setLoading(true);
    try {
      const res = await api.get('/tests', { params: { userEmail: email, page: 1, limit: 10 } });
      setTests(res.data.data.tests);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <Card title="Find your past tests" subtitle="Enter the email you used when creating tests.">
        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <div className="self-end">
            <Button onClick={search} disabled={loading}>{loading ? 'Searching…' : 'Search'}</Button>
          </div>
        </div>
      </Card>

      <Card title="Results">
        {tests.length === 0 ? (
          <p className="text-sm text-slate-600">No tests yet. Try a different email or run a new test.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-3 py-2 border-b">Code</th>
                  <th className="text-left px-3 py-2 border-b">Status</th>
                  <th className="text-left px-3 py-2 border-b">Score</th>
                  <th className="text-left px-3 py-2 border-b">Created</th>
                  <th className="text-left px-3 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {tests.map(t => (
                  <tr key={t._id} className="border-b">
                    <td className="px-3 py-2 font-mono">{t.testCode}</td>
                    <td className="px-3 py-2">{t.status}</td>
                    <td className="px-3 py-2">{t.deliverabilityScore ?? '-'}</td>
                    <td className="px-3 py-2">{new Date(t.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <Link to={`/report/${t._id}`} className="text-indigo-700 hover:underline">View report</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoryPage;
