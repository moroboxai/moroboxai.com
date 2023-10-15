import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("./embedApp"), { ssr: false });

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <App>{children}</App>;
}
