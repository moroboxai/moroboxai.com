import type { Metadata } from "next";
import React from "react";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "MoroboxAI",
    description: "Home of MoroboxAI"
};

const App = dynamic(() => import("./app"), { ssr: false });

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <App>{children}</App>
            </body>
        </html>
    );
}
