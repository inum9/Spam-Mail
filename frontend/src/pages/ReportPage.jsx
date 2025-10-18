import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiClient from '../apiClient';

const ReportPage = () => {
  const { testId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await apiClient.get(`/reports/${testId}`);
      setReport(response.data.data);
    } catch {
      toast.error('Failed to load report');
    }
  };

  if (!report) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Deliverability Report</h1>
      <p className="mb-4 text-center">Test Code: <span className="font-mono">{report.testCode}</span></p>
      <p className="mb-6 text-center">Score: <strong>{report.deliverabilityScore}%</strong></p>
      <table className="w-full border-collapse border border-gray-300 text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Inbox</th>
            <th className="border border-gray-300 px-4 py-2">Received</th>
            <th className="border border-gray-300 px-4 py-2">Folder</th>
          </tr>
        </thead>
        <tbody>
          {report.results.map((inbox) => (
            <tr key={inbox.email}>
              <td className="border border-gray-300 px-4 py-2 font-mono">{inbox.email}</td>
              <td className="border border-gray-300 px-4 py-2">{inbox.received ? '✔️' : '❌'}</td>
              <td className="border border-gray-300 px-4 py-2">{inbox.folder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
