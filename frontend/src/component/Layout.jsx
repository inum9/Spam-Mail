// src/components/layout/Layout.jsx
import { Link, useLocation } from 'react-router-dom';

const steps = [
  { path: '/', label: 'Start' },
  { path: '/test', label: 'Send & Verify' },
  { path: '/report', label: 'Report' },
  { path: '/history', label: 'History' },
];

const Layout = ({ children }) => {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-indigo-700">
            <span className="text-xl font-semibold">Email Deliverability</span>
          </Link>
          <nav className="flex gap-2 text-sm">
            <Link to="/history" className="px-3 py-1.5 rounded hover:bg-slate-100">History</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pt-4">
        <ol className="flex gap-2 flex-wrap text-xs text-slate-600 mb-4">
          {steps.map(s => {
            const active = loc.pathname.startsWith(s.path) && s.path !== '/test' ? s.path === loc.pathname : loc.pathname.startsWith('/test') && s.path === '/test';
            return (
              <li key={s.path} className={`px-2.5 py-1 rounded border ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200'}`}>
                {s.label}
              </li>
            );
          })}
        </ol>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-10">{children}</main>

      <footer className="border-t bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500">
          Built for quick and reliable inbox placement checks. Avoid sharing credentials publicly. 
        </div>
      </footer>
    </div>
  );
};

export default Layout;
