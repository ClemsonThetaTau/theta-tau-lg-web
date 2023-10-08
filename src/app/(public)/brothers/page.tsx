'use client'

import { useState, useEffect } from 'react';

interface Brother {
    name: string;
    email: string;
    image: string;
}

export default function Brothers() {
    const [brothers, setBrothers] = useState<Brother[]>([]);

    useEffect(() => {
        // Fetch brothers data from database
        fetch('/api/brothers')
            .then(response => response.json())
            .then(data => setBrothers(data));
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {brothers.map(brother => (
                <div key={brother.email}>
                    <img src={brother.image} alt={brother.name} className="w-full h-auto" />
                    <div className="text-center">
                        <h2 className="text-lg font-bold">{brother.name}</h2>
                        <p className="text-sm">{brother.email}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}