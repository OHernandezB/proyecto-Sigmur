import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Hammer, Monitor, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const roles = [
    {
        id: "ciudadano",
        title: "Ciudadano",
        description: "Reporta incidencias y ayuda a mejorar tu comuna.",
        icon: <User className="text-indigo-600" size={24} />,
        color: "bg-indigo-50",
        hover: "hover:border-indigo-600 hover:shadow-indigo-100",
        path: "/ciudadano",
        demo: "ciudadano / ciudadano123"
    },
    {
        id: "operario",
        title: "Operario",
        description: "Gestiona y resuelve los reportes asignados.",
        icon: <Hammer className="text-emerald-600" size={24} />,
        color: "bg-emerald-50",
        hover: "hover:border-emerald-600 hover:shadow-emerald-100",
        path: "/operario",
        demo: "operario / operario123"
    },
    {
        id: "admin",
        title: "Administrador",
        description: "Panel de control central y estadísticas municipales.",
        icon: <Monitor className="text-slate-600" size={24} />,
        color: "bg-slate-50",
        hover: "hover:border-slate-600 hover:shadow-slate-100",
        path: "/admin",
        demo: "admin / admin123"
    }
];

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState("ciudadano");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const selectedRoleData = roles.find((role) => role.id === selectedRole) ?? roles[0];

    const handleLogin = (event) => {
        event.preventDefault();
        setError("");

        const success = login({ role: selectedRole, username, password });
        if (!success) {
            setError("Credenciales incorrectas para el rol seleccionado.");
            return;
        }

        navigate(selectedRoleData.path);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/30 rounded-full blur-[120px]" />

            <div className="w-full max-w-lg px-6 z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl shadow-slate-200/50 mb-6 border border-slate-100">
                        <ShieldCheck className="text-indigo-600" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                        SIG<span className="text-indigo-600">MUR</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">
                        Sistema Inteligente de Gestión Municipal y Reporte Urbano
                    </p>
                </div>

                <div className="grid gap-4 mb-6">
                    {roles.map((role, index) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`group w-full bg-white p-5 rounded-[24px] border-2 shadow-sm flex items-center gap-5 text-left transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                                selectedRole === role.id ? "border-indigo-600 shadow-indigo-100" : `border-transparent ${role.hover}`
                            }`}
                        >
                            <div className={`w-14 h-14 ${role.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                {role.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-800">{role.title}</h3>
                                <p className="text-sm text-slate-500 leading-tight">{role.description}</p>
                            </div>
                            <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:text-slate-600 group-hover:bg-white transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                            </div>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleLogin} className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Acceso {selectedRoleData.title}</p>
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        placeholder="Usuario"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Contraseña"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    {error && <p className="text-sm text-rose-600 font-medium">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                        Ingresar
                    </button>
                    <p className="text-xs text-slate-500 text-center">Demo: {selectedRoleData.demo}</p>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em]">
                        Municipalidad de Tu Comuna &copy; 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
