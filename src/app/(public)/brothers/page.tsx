'use client'

import { useState, useEffect } from 'react';

import { db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore"; 

interface Brother {
    name: string;
    email: string;
    image: string;
}

export default function Brothers() {
    const [brothers, setBrothers] = useState<Brother[]>([]);

    useEffect(() => {
        // Fetch brothers data from database
        const fetchData = async () => {
            const brothersCollection = collection(db, 'users');
            const brothersSnapshot = await getDocs(brothersCollection);
            const brothersData = brothersSnapshot.docs.map(doc => {
                const data = doc.data();
                const brother: Brother = {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.displayEmail,
                    image: data.profilePicture
                };
                return brother;
            });
            setBrothers(brothersData);
            console.log(brothersData);
        };
        fetchData();
    }, []);

    return (
        <section>
            <h1 className="text-4xl font-bold text-center">Meet the Brothers of the Lambda Gamma Chapter!</h1>
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
        </section>
    );
}