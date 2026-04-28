import { createContext, useState } from "react";

export const ReportesContext = createContext();

export function ReportesProvider({ children }) {

    const [reportes, setReportes] = useState([]);

    return (
        <ReportesContext.Provider value={{ reportes, setReportes }}>
            {children}
        </ReportesContext.Provider>
    );
}