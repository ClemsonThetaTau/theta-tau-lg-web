import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import type { ServerFunctionClient } from 'payload';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import '@payloadcms/next/css';
import '@/payload/payload.css';

// Import config from the correct location
import config from '@/payload/payload.config';
import { importMap } from './admin/importMap.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Theta Tau Lambda Gamma - Admin',
  description: 'Admin panel for Theta Tau Lambda Gamma website',
};

// Define server function for PayloadCMS
const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
          {children}
        </RootLayout>
      </body>
    </html>
  );
}