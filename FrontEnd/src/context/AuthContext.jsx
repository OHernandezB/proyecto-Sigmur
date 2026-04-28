/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "sigmur-auth";

const DEMO_USERS = {
    ciudadano: { username: "ciudadano", password: "ciudadano123", redirectTo: "/ciudadano" },
    operario: { username: "operario", password: "operario123", redirectTo: "/operario" },
    admin: { username: "admin", password: "admin123", redirectTo: "/admin" }
};

const AuthContext = createContext(null);

function getInitialSession() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        return null;
    }

    try {
        return JSON.parse(saved);
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState(getInitialSession);

    const login = ({ role, username, password }) => {
        const user = DEMO_USERS[role];
        if (!user) {
            return false;
        }

        const valid = user.username === username.trim() && user.password === password;
        if (!valid) {
            return false;
        }

        const nextSession = { role, username: user.username };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
        return true;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
    };

    const value = useMemo(() => ({
        isAuthenticated: Boolean(session),
        session,
        login,
        logout
    }), [session]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
}
