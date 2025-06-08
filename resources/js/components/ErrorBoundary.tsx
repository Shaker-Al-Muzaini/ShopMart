import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-left text-red-700 bg-red-50 border border-red-200 rounded">
                    <h2 className="font-bold text-red-800 mb-2">⚠️ حدث خطأ:</h2>
                    <pre className="whitespace-pre-wrap text-sm">
            {this.state.error?.toString()}
          </pre>
                    {this.state.errorInfo?.componentStack && (
                        <details className="mt-2 text-xs">
                            <summary className="cursor-pointer">عرض تفاصيل الخطأ</summary>
                            <pre>{this.state.errorInfo.componentStack}</pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
