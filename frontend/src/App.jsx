import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './component/Layout'; // Main layout with header/footer
import HomePage from './pages/HomePages';
import TestPage from './pages/TestPages';
import ReportPage from './pages/ReportPage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/report/:testId" element={<ReportPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
