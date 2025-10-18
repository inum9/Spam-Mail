// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout.jsx';
import HomePage from './pages/HomePages.jsx';
import TestPage from './pages/TestPages.jsx';
import ReportPage from './pages/ReportPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import ErrorBoundary from './component/ErrorBoundary.jsx';

const App = () => (
  <ErrorBoundary>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/report/:testId" element={<ReportPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  </ErrorBoundary>
);

export default App;
