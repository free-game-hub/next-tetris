import "@/app/globals.css";
import localFont from "next/font/local";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Sprunki Infected",
    description: "Play Sprunki Infected Online",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-800`}
        >
        {children}
        </body>
        </html>
    );
}