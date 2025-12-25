import { useState } from 'react';
import Dashboard from "@/components/Dashboard.tsx";
import LoginScreen from "@/components/LoginScreen.tsx";

export default function App() {
    const [token, setToken] = useState<string | null>(null);

    if (!token) {
        return <LoginScreen onLoginSuccess={setToken} />;
    }

    return <Dashboard token={token} onLogout={() => setToken(null)} />;
}