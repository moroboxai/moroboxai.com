import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "MoroboxAI",
    description: "Home of MoroboxAI"
};

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
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
