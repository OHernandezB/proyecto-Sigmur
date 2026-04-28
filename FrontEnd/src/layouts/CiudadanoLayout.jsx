import { useNavigate } from "react-router-dom";

export function CiudadanoLayout({ children }) {

    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col">

            {/* CONTENIDO */}
            <div className="flex-1 overflow-hidden">
                {children}
            </div>

            {/* NAVBAR */}
            <div className="h-16 bg-white border-t flex justify-around items-center">

                <button
                    onClick={() => navigate("/ciudadano")}
                    className="flex flex-col items-center text-blue-600"
                >
                    🗺️
                    <span className="text-xs">Mapa</span>
                </button>

                <button
                    onClick={() => navigate("/reportes")}
                    className="flex flex-col items-center text-gray-500"
                >
                    📋
                    <span className="text-xs">Reportes</span>
                </button>

                <button
                    onClick={() => navigate("/perfil")}
                    className="flex flex-col items-center text-gray-500"
                >
                    👤
                    <span className="text-xs">Perfil</span>
                </button>

            </div>

        </div>
    );
}