import { useEffect, useRef } from "react";

// Franja vertical con una enredadera élfica (tallo, hojas y estrellas).
// Se repite hacia abajo y se desplaza suave al hacer scroll.
export default function Enredadera({ lado, velocidad = 0.25 }) {
  const patron = useRef(null);
  const id = `enredadera-${lado}`;

  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducir) return;

    let pendiente = false;
    const mover = () => {
      pendiente = false;
      if (patron.current) {
        patron.current.setAttribute("patternTransform", `translate(0 ${window.scrollY * velocidad})`);
      }
    };
    const alScroll = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(mover);
      }
    };
    mover();
    window.addEventListener("scroll", alScroll, { passive: true });
    return () => window.removeEventListener("scroll", alScroll);
  }, [velocidad]);

  return (
    <svg className={`enredadera ${lado}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern ref={patron} id={id} width="44" height="200" patternUnits="userSpaceOnUse">
          {/* tallo principal, sin cortes al repetirse */}
          <path
            d="M22 0 C37 33 37 67 22 100 C7 133 7 167 22 200"
            fill="none"
            stroke="#bfe0f5"
            strokeOpacity="0.6"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* hilo fino paralelo */}
          <path
            d="M22 0 C30 33 30 67 22 100 C14 133 14 167 22 200"
            fill="none"
            stroke="#7cc4ee"
            strokeOpacity="0.45"
            strokeWidth="0.8"
          />
          {/* hojas alternadas */}
          <g fill="#7cc4ee" fillOpacity="0.55" stroke="#bfe0f5" strokeOpacity="0.7" strokeWidth="0.6">
            <path d="M0 0 Q8 -9 18 0 Q8 9 0 0Z" transform="translate(30 38) rotate(-25)" />
            <path d="M0 0 Q6 -6 13 0 Q6 6 0 0Z" transform="translate(33 62) rotate(35)" />
            <path d="M0 0 Q8 -9 18 0 Q8 9 0 0Z" transform="translate(14 138) rotate(205)" />
            <path d="M0 0 Q6 -6 13 0 Q6 6 0 0Z" transform="translate(11 162) rotate(145)" />
          </g>
          {/* estrellas de cuatro puntas en los nudos */}
          <g fill="#f7fbff" fillOpacity="0.9">
            <path d="M22 -7 L24 0 L31 2 L24 4 L22 11 L20 4 L13 2 L20 0Z" transform="translate(0 0)" />
            <path d="M22 93 L24 100 L31 102 L24 104 L22 111 L20 104 L13 102 L20 100Z" />
          </g>
          {/* puntos de luz */}
          <g fill="#bfe0f5" fillOpacity="0.7">
            <circle cx="6" cy="50" r="1.4" />
            <circle cx="39" cy="150" r="1.4" />
            <circle cx="38" cy="14" r="1" />
            <circle cx="5" cy="114" r="1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
