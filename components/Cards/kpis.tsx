import "./styles.css"

export default function Kpis(){
    return(
        <article className="card">
            
            {/* CARD 1 */}
            <div className="card__Total">
                <div className="conteudo__texto">
                    <h1>Total</h1>
                </div>
                <span className="kpi-valor">45</span>
            </div>  

            {/* CARD 2 */}
            <div className="card__NaFila">
                <div className="conteudo__texto">
                    <h1>Na fila</h1>
                </div>
                <span className="kpi-valor">12</span>
            </div>  

            {/* CARD 3 */}
            <div className="card__Finalizado">
                <div className="conteudo__texto">
                    <h1>Finalizados</h1>
                </div>
                <span className="kpi-valor">30</span>
            </div>

            {/* CARD 4 */}
            <div className="card__Divergencia">
                <div className="conteudo__texto">
                    <h1>Divergências</h1>
                </div>
                <span className="kpi-valor">2</span>
            </div>

        </article>
    )
}