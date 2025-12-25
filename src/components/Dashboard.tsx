import { useState, useEffect } from 'react';
import { Trash2, LogOut } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";
import {API_URL} from "@/components/constants.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

class User {
    public id: string;
    public username: string;
    constructor(id: string, username: string) {
        this.id = id;
        this.username = username;
    }
}

export default function Dashboard({ token, onLogout }: { token: string, onLogout: () => void }) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await fetch(`${API_URL}/User/list`, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
                if (res.status === 401) return onLogout();
                const data = await res.json();
                setUsers(data.users || []);
            } catch (e) {
                console.error("Error loading users", e);
            }
        };
        
        loadUsers();
    }, [onLogout, token]);

    const deleteUser = async (id: string) => {
        if (!confirm("Delete user?")) return;
        await fetch(`${API_URL}/User/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        });
        setUsers(users.filter(u => u.id !== id));
    };

    return (
        <div className="p-10 mx-auto flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Users</h2>
                <Button onClick={onLogout} variant="outline" className="flex gap-2 items-center">
                    <LogOut /> Logout
                </Button>
            </div>

            <div className="border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell className="text-muted-foreground font-mono text-xs">{user.id}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteUser(user.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {users.length === 0 && (
                    <div className="p-4 text-center text-sm">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
}