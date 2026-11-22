import { useState } from "react";
import { portada, cartas, cierre } from "./cartas.js";
import Enredadera from "./Enredadera.jsx";

function Carta({ foto, leyenda, mensaje, indice }) {
  const [volteada, setVolteada] = useState(false);
  const [sinFoto, setSinFoto] = useState(false);

  return (
    <li className="carta-item" style={{ "--giro": indice % 2 === 0 ? "-2deg" : "2deg" }}>
      <button
        type="button"
        className={`carta ${volteada ? "volteada" : ""}`}
        onClick={() => setVolteada((v) => !v)}
        aria-pressed={volteada}
        aria-label={
          volteada ? "Carta mostrando el mensaje. Toca para ver la foto." : "Toca para leer el mensaje de esta foto."
        }
      >
        <span className="carta-interior">
          <span className="cara frente">
            <span className="marco-foto">
              {sinFoto ? (
                <span className="foto-vacia">Aquí va tu foto</span>
              ) : (
                <img src={foto} alt={leyenda || "Foto"} onError={() => setSinFoto(true)} />
              )}
            </span>
            <span className="leyenda">{leyenda}</span>
          </span>

          <span className="cara dorso">
            <span className="mensaje">{mensaje}</span>
          </span>
        </span>
      </button>
    </li>
  );
}

export default function App() {
  return (
    <main>
      <header className="portada">
        <h1>{portada.titulo}</h1>
        <p>{portada.subtitulo}</p>
        <span className="flecha" aria-hidden="true">↓</span>
      </header>

      <div className="zona-cartas">
        <Enredadera lado="izquierda" velocidad={0.25} />
        <Enredadera lado="derecha" velocidad={0.25} />
        <ol className="cartas">
          {cartas.map((c, i) => (
            <Carta key={i} indice={i} {...c} />
          ))}
        </ol>
      </div>

      <footer className="cierre">{cierre}</footer>
    </main>
  );
}
