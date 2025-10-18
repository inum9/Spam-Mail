import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error:null, info:null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    // Optional: send to your logging service
    // logErrorToService({ error, info });
    console.error('ErrorBoundary caught error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false, error:null, info:null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-xl shadow p-6">
            <h1 className="text-xl font-semibold text-slate-900 mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-600 mb-4">An unexpected error occurred in the UI. You can try reloading the page.</p>
            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <pre className="text-xs bg-slate-50 border border-slate-200 rounded p-3 overflow-auto max-h-48 mb-4">
                {this.state.error?.toString()}
                {'\n'}
                {this.state.info?.componentStack}
              </pre>
            )}
            <div className="flex gap-2">
              <button onClick={this.handleReload} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                Reload
              </button>
              <button onClick={()=>this.setState({hasError:false})} className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
