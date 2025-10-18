// src/pages/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../component/Card';
import Input from '../component/Input';
import Button from '../component/Button';
import api from '../apiClient';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validate = (val) => /^\S+@\S+\.\S+$/.test(val);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate(email)) {
      setErr('Enter a valid email address');
      return;
    }
    setErr('');
    setSubmitting(true);
    try {
      const res = await api.post('/tests/create', { userEmail: email });
      const { testId } = res.data.data;
      navigate(`/test/${testId}`);
    } catch (e) {
      setErr(e.message || 'Unable to start test');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Card
        title="Test your email deliverability"
        subtitle="Send one email to preconfigured inboxes; get a scored report with placement details."
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Your email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            error={err}
            hint="No passwords required. You will send an email from your own client."
          />
          <Button type="submit" disabled={submitting} size="lg" full>
            {submitting ? 'Creating test…' : 'Create test'}
          </Button>
          <ul className="text-xs text-slate-600 space-y-1 mt-2 list-disc pl-4">
            <li>You’ll get 5 test inboxes to email, plus a unique code to include.</li>
            <li>After sending, click Start Check to analyze placement.</li>
            <li>Report includes Inbox/Spam/Promotions and a score.</li>
          </ul>
        </form>
      </Card>

      <Card title="What you’ll need" subtitle="This flow does not ask for your mailbox credentials.">
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
          <li>Access to send an email from your normal client or service.</li>
          <li>Ability to paste a test code into subject or body.</li>
          <li>5–10 minutes for the analysis to complete.</li>
        </ul>
      </Card>
    </div>
  );
};

export default HomePage;
