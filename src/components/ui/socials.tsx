import React from 'react';

interface SocialButtonProps {
    link: string;
    icon: React.ReactNode;
}

const SocialButton = ({ link, icon }: SocialButtonProps) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <button
                className="flex justify-center items-center rounded-full w-10 h-10 bg-gray-800 text-primary-foreground border-none cursor-pointer hover:bg-secondary transition-colors"
            >
                {icon}
            </button>
        </a>
    );
}

export { SocialButton }