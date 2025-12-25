import {useCallback, useState} from 'react';
import Dashboard from "@/components/Dashboard.tsx";
import LoginScreen from "@/components/LoginScreen.tsx";

export default function App() {
    const [token, setToken] = useState<string | null>(() => {
        const rawToken = localStorage.getItem('token');
        if(rawToken)
            return JSON.parse(rawToken)
        else return null;
    });

    const logout = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
    }, [])

    if (!token) {
        return <LoginScreen onLoginSuccess={setToken} />;
    }

    return <Dashboard token={token} onLogout={logout} />;
}