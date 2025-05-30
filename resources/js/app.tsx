import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
import ErrorBoundary from './Components/ErrorBoundary';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <ErrorBoundary>
                    <App {...props} />
                </ErrorBoundary>
                <ToastContainer position="top-right" autoClose={3000} />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
