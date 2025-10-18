// src/components/ui/InlineCopy.jsx
import { useState } from 'react';

const InlineCopy = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded px-2 py-1">
      <code className="text-xs text-slate-700">{value}</code>
      <button onClick={onCopy} className="text-xs text-indigo-700 hover:underline">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

export default InlineCopy;
