import "./styles.css"

export default function Kpis() {
    return (
        <div className="kpi-section">
            
            {/* Card 1: TOTAL */}
            <div className="card-kpi kpi-total">
                <div className="kpi-info">
                    <span className="kpi-titulo">Total</span>
                    <span className="kpi-valor">0</span>
                </div>
                {/* Ícone opcional (SVG) */}
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{opacity: 0.3}}><path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>

            {/* Card 2: NA FILA */}
            <div className="card-kpi kpi-fila">
                <div className="kpi-info">
                    <span className="kpi-titulo">Na Fila</span>
                    <span className="kpi-valor">0</span>
                </div>
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{opacity: 0.3}}><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>

            {/* Card 3: FINALIZADOS */}
            <div className="card-kpi kpi-finalizado">
                <div className="kpi-info">
                    <span className="kpi-titulo">Finalizados</span>
                    <span className="kpi-valor">0</span>
                </div>
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{opacity: 0.3}}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>

            {/* Card 4: DIVERGÊNCIAS */}
            <div className="card-kpi kpi-divergencia">
                <div className="kpi-info">
                    <span className="kpi-titulo">Divergências</span>
                    <span className="kpi-valor">0</span>
                </div>
                <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{opacity: 0.3}}><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>

        </div>
    );
}