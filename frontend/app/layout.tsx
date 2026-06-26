import { AuthProvider }
    from "@/context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <AuthProvider>
                    {children}
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                </AuthProvider>
            </body>
        </html>
    );
}