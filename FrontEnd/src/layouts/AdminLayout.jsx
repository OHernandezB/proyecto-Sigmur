import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, Settings, LogOut, Shield } from "lucide-react";

export function AdminLayout({ children }) {
    const location = useLocation();

    const menuItems = [
        { path: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/admin/reportes", label: "Reportes", icon: <ListTodo size={20} /> },
        { path: "/admin/config", label: "Configuración", icon: <Settings size={20} /> },
    ];

    return (
        <div className="h-screen flex bg-slate-50 font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                        <Shield size={22} />
                    </div>
                    <span className="text-xl font-black text-slate-800 tracking-tight">SIGMUR</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                    >
                        <LogOut size={20} />
                        <span>Cerrar Sesión</span>
                    </Link>
                </div>
            </aside>

            {/* CONTENIDO */}
            <main className="flex-1 overflow-y-auto relative">
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Panel de Administración
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-800">Admin User</p>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider text-right">Municipalidad</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}