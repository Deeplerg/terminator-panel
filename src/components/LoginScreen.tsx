import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {API_URL} from "@/components/constants.ts";

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess: (t: string) => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const doLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!res.ok) throw new Error("Invalid credentials");
            const data = await res.json();
            onLoginSuccess(data.accessToken);
        } catch (err) {
            setError("Login failed");
            console.error("login failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">

            <form onSubmit={doLogin} className="flex flex-col gap-4 border p-8">
                <h1 className="text-xl font-bold text-center">Admin</h1>

                <div className="flex flex-col gap-1">
                    <Label className="text-sm" htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-sm" htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <Button
                    disabled={loading}
                    className="flex justify-center disabled"
                >
                    {loading ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
            </form>
        </div>
    );
}