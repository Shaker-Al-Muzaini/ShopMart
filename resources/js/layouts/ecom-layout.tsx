import { Head } from '@inertiajs/react';
import Header from '@/components/ecommerce/Header';
import Footer from '@/components/ecommerce/Footer';
import React from 'react';

interface EcommelLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export function EcomLayout({ children, title = 'S-Mart' }: EcommelLayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="S-Mart - Your one-stop online shopping destination"
                />
                <meta
                    name="keywords"
                    content="shopping, e-commerce, online store, electronics, fashion, home goods"
                />
                <meta name="author" content="S-Mart Team" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
