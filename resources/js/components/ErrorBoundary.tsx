import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // تحديث الحالة لعرض واجهة احتياطية
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // يمكنك تسجيل الخطأ هنا في سيرفر أو أدوات تتبع
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-center text-red-600">
                    حدث خطأ غير متوقع. الرجاء تحديث الصفحة أو المحاولة لاحقًا.
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
