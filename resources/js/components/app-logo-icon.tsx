import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg viewBox="0 0 40 42" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <path d="M6 12h28l-4 18H10l-4-18z" />
            <line x1="6" y1="12" x2="14" y2="6" />
            <line x1="34" y1="12" x2="26" y2="6" />
            <circle cx="14" cy="34" r="4" fill="#fff" />
            <circle cx="26" cy="34" r="4" fill="#fff" />
        </svg>



    );
}


