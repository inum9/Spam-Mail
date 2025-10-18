// src/pages/ReportPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../component/Card';
import Button from '../component/Button';
import api from '../apiClient';

const ReportPage = () => {
  const { testId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/reports/${testId}`);
      setReport(res.data.data);
    };
    load();
  }, [testId]);

  if (!report) return <p className="mt-6">Loading…</p>;

  const receivedCount = report.results.filter(r => r.received).length;

  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-6">
      <Card title="Overall score" subtitle={`Received in ${receivedCount}/${report.results.length} inboxes`}>
        <div className="flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center">
            <span className="text-5xl font-bold text-indigo-700">{report.deliverabilityScore}%</span>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-600">
          Test code: <span className="font-mono">{report.testCode}</span>
        </div>
      </Card>

      <Card className="lg:col-span-2" title="Placement breakdown" subtitle="Folder per provider inbox">
        <div className="overflow-auto">
          <table className="w-full text-sm border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-3 py-2 border-b">Inbox</th>
                <th className="text-left px-3 py-2 border-b">Received</th>
                <th className="text-left px-3 py-2 border-b">Folder</th>
                <th className="text-left px-3 py-2 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {report.results.map((r) => (
                <tr key={r.email} className="border-b">
                  <td className="px-3 py-2 font-mono">{r.email}</td>
                  <td className="px-3 py-2">{r.received ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2">{r.folder}</td>
                  <td className="px-3 py-2">{r.receivedAt ? new Date(r.receivedAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Suggestions" subtitle="Improve inbox placement next time.">
        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
          <li>Warm up sender by sending to engaged contacts first.</li>
          <li>Keep subject short; avoid spammy words and full caps.</li>
          <li>Authenticate domain with SPF, DKIM, DMARC.</li>
          <li>Remove broken links and large attachments.</li>
        </ul>
        <div className="mt-4">
          <Link to="/"><Button variant="secondary" full>Run another test</Button></Link>
        </div>
      </Card>
    </div>
  );
};

export default ReportPage;
