// src/pages/TestPage.jsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../component/Card';
import Button from '../component/Button';
import InlineCopy from '../component/InlineCopy';
import api from '../apiClient';

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [starting, setStarting] = useState(false);
  const pollRef = useRef(null);

  const load = async () => {
    const res = await api.get(`/tests/${testId}`);
    setData(res.data.data);
    if (res.data.data.status === 'completed') {
      clearInterval(pollRef.current);
      navigate(`/report/${testId}`);
    }
  };

  useEffect(() => {
    load();
    return () => clearInterval(pollRef.current);
  }, [testId]);

  const startCheck = async () => {
    setStarting(true);
    try {
      await api.post(`/tests/${testId}/check`);
      pollRef.current = setInterval(load, 4000);
    } finally {
      setStarting(false);
    }
  };

  if (!data) return <p className="mt-6">Loading…</p>;

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Card title="Your test code" subtitle="Include this in subject or body of your email.">
        <div className="flex items-center justify-between">
          <InlineCopy value={data.testCode} />
          <span className="text-xs text-slate-500">Required for detection</span>
        </div>
      </Card>

      <Card title="Send to these inboxes" subtitle="Send one email to all addresses below.">
        <ul className="space-y-2">
          {data.results?.map((r, i) => (
            <li key={i} className="flex items-center justify-between">
              <span className="font-mono text-sm text-slate-800">{r.email}</span>
              <InlineCopy value={r.email} />
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Start analysis" subtitle="Click after you’ve sent the email.">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Status: <span className="font-medium">{data.status}</span>
          </div>
          {data.status === 'pending' && (
            <Button onClick={startCheck} disabled={starting}> {starting ? 'Starting…' : 'Start Check'} </Button>
          )}
          {data.status === 'processing' && (
            <span className="text-amber-600 text-sm">Processing… auto-refreshing</span>
          )}
        </div>
      </Card>

      <Card title="Tips" subtitle="Improve accuracy of detection.">
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
          <li>Send within 5 minutes to avoid timeouts.</li>
          <li>Keep subject minimal except the code for clearer matching.</li>
          <li>Avoid attachments on the first test for speed.</li>
        </ul>
      </Card>
    </div>
  );
};

export default TestPage;
