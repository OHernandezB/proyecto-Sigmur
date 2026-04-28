import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, UserRound, LogOut, Menu, X, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function CiudadanoLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { path: "/ciudadano", label: "Mapa", icon: <LayoutDashboard size={18} /> },
        { path: "/reportes", label: "Reportes", icon: <FileText size={18} /> },
        { path: "/perfil", label: "Perfil", icon: <UserRound size={18} /> }
    ];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <div className="flex min-h-screen">
                <aside className="hidden md:flex md:w-72 lg:w-80 bg-white border-r border-slate-200 flex-col">
                    <div className="px-6 py-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tight text-slate-800">SIGMUR</h1>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Portal Ciudadano</p>
                            </div>
                        </div>
                    </div>

                    <nav className="p-4 space-y-2 flex-1">
                        {links.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-all ${
                                        isActive
                                            ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                        >
                            <LogOut size={18} />
                            Cerrar sesion
                        </button>
                    </div>
                </aside>

                <div className="flex-1 flex flex-col min-w-0">
                    <header className="md:hidden sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="text-center">
                            <h2 className="text-sm font-black tracking-tight text-slate-800">SIGMUR</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ciudadano</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700"
                        >
                            <LogOut size={18} />
                        </button>
                    </header>

                    <main className="flex-1 min-h-0 overflow-auto">{children}</main>
                </div>
            </div>

            <div className={`md:hidden fixed inset-0 z-40 transition ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div
                    onClick={() => setMobileOpen(false)}
                    className={`absolute inset-0 bg-slate-900/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
                />
                <aside className={`absolute left-0 top-0 h-full w-72 bg-white border-r border-slate-200 p-4 flex flex-col transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-black text-slate-800">SIGMUR</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portal Ciudadano</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <nav className="space-y-2 flex-1">
                        {links.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-all ${
                                        isActive
                                            ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    >
                        <LogOut size={18} />
                        Cerrar sesion
                    </button>
                </aside>
            </div>
        </div>
    );
}