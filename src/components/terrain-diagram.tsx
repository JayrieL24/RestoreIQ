import type { AreaTerrain } from "@/lib/service-areas";

/**
 * Cross-section diagrams showing how water moves through each terrain type.
 * Drawn in the site's navy and cyan, with enough architectural detail —
 * eaves, fascia, sill courses, siding, footings — to read as a technical
 * section rather than a child's outline of a house.
 */

/** Shared defs: hatches and gradients reused across the three diagrams. */
function Defs() {
  return (
    <defs>
      <linearGradient id="td-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b3153" stopOpacity=".07" />
        <stop offset="1" stopColor="#0b3153" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="td-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#13cbd3" stopOpacity=".32" />
        <stop offset="1" stopColor="#0878b7" stopOpacity=".14" />
      </linearGradient>
      <linearGradient id="td-slope" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b3153" stopOpacity=".1" />
        <stop offset="1" stopColor="#0b3153" stopOpacity=".02" />
      </linearGradient>
      <linearGradient id="td-spread" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#13cbd3" stopOpacity=".36" />
        <stop offset="1" stopColor="#13cbd3" stopOpacity="0" />
      </linearGradient>
      {/* Soil hatch below grade */}
      <pattern id="td-soil" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="12" stroke="#0b3153" strokeWidth="1" opacity=".16" />
      </pattern>
      {/* Wall cavity hatch */}
      <pattern id="td-stud" width="9" height="9" patternUnits="userSpaceOnUse">
        <line x1="0" y1="9" x2="9" y2="0" stroke="#0878b7" strokeWidth=".8" opacity=".3" />
      </pattern>
    </defs>
  );
}

/** Roof with eaves, fascia and ridge — shared silhouette, parameterised. */
function Roof({ cx, apexY, halfSpan, eaveY }: { cx: number; apexY: number; halfSpan: number; eaveY: number }) {
  const l = cx - halfSpan;
  const r = cx + halfSpan;
  return (
    <g>
      {/* Rafter plane */}
      <path d={`M${l} ${eaveY}L${cx} ${apexY}L${r} ${eaveY}Z`} fill="#f4f9fc" stroke="#0b3153" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Ridge line */}
      <path d={`M${cx} ${apexY}L${cx} ${eaveY}`} stroke="#0b3153" strokeWidth="1" opacity=".22" />
      {/* Fascia + overhanging eaves */}
      <path d={`M${l - 14} ${eaveY}L${r + 14} ${eaveY}`} stroke="#0b3153" strokeWidth="2.6" strokeLinecap="round" />
      <path d={`M${l - 14} ${eaveY + 5}L${r + 14} ${eaveY + 5}`} stroke="#0b3153" strokeWidth="1.1" opacity=".35" strokeLinecap="round" />
      {/* Roofing courses */}
      {[0.3, 0.5, 0.7].map((t) => (
        <path
          key={t}
          d={`M${l + halfSpan * t * 0.92} ${eaveY - (eaveY - apexY) * t * 0.92}L${r - halfSpan * t * 0.92} ${eaveY - (eaveY - apexY) * t * 0.92}`}
          stroke="#0b3153"
          strokeWidth=".9"
          opacity=".18"
        />
      ))}
    </g>
  );
}

/** Window with frame, sill and mullion. */
function Window({ x, y, w = 38, h = 32, lit = false }: { x: number; y: number; w?: number; h?: number; lit?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={lit ? "#e7f6fe" : "#f7fbfd"} stroke="#0b3153" strokeWidth="1.7" />
      <path d={`M${x + w / 2} ${y}L${x + w / 2} ${y + h}`} stroke="#0b3153" strokeWidth="1" opacity=".45" />
      <path d={`M${x} ${y + h / 2}L${x + w} ${y + h / 2}`} stroke="#0b3153" strokeWidth="1" opacity=".3" />
      {/* Sill */}
      <path d={`M${x - 4} ${y + h + 3}L${x + w + 4} ${y + h + 3}`} stroke="#0b3153" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function TerrainDiagram({ terrain }: { terrain: AreaTerrain }) {
  if (terrain === "coastal") {
    return (
      <svg className="ri26-terrain-svg" viewBox="0 0 520 360" role="img" aria-label="Cross-section of a coastal property showing wind-driven water entering at windows and the roof edge">
        <Defs />
        <rect x="0" y="0" width="520" height="360" fill="url(#td-sky)" />

        {/* Sea, shoreline and swell */}
        <path d="M0 272C54 266 92 278 142 274L142 360L0 360Z" fill="url(#td-sea)" />
        <path d="M0 272C54 266 92 278 142 274" stroke="#0878b7" strokeWidth="1.7" fill="none" opacity=".5" />
        <path d="M10 292C40 288 66 298 104 294" stroke="#13cbd3" strokeWidth="1.5" fill="none" opacity=".55" strokeLinecap="round" />
        <path d="M4 312C36 308 68 318 112 314" stroke="#13cbd3" strokeWidth="1.5" fill="none" opacity=".4" strokeLinecap="round" />
        <path d="M18 331C46 328 74 336 108 333" stroke="#13cbd3" strokeWidth="1.3" fill="none" opacity=".28" strokeLinecap="round" />

        {/* Grade and soil */}
        <path d="M142 274L520 262L520 300L142 312Z" fill="url(#td-soil)" />
        <path d="M142 274L520 262" stroke="#0b3153" strokeWidth="2" opacity=".4" />

        {/* Structure: footing, slab, walls */}
        <path d="M228 274H410" stroke="#0b3153" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M222 283H416" stroke="#0b3153" strokeWidth="1.5" opacity=".4" strokeLinecap="round" />
        <rect x="232" y="176" width="174" height="98" fill="#fff" stroke="#0b3153" strokeWidth="2.2" />
        {/* Wall cavity on the weather side */}
        <rect x="232" y="176" width="13" height="98" fill="url(#td-stud)" stroke="#0b3153" strokeWidth="1.2" />
        {/* Floor line + skirting */}
        <path d="M245 258H406" stroke="#0b3153" strokeWidth="1.3" opacity=".35" />
        <path d="M245 264H406" stroke="#0b3153" strokeWidth="1" opacity=".2" />
        {/* Siding courses */}
        {[196, 212, 228, 244].map((y) => (
          <path key={y} d={`M245 ${y}H406`} stroke="#0b3153" strokeWidth=".8" opacity=".12" />
        ))}

        <Roof cx={319} apexY={118} halfSpan={101} eaveY={176} />

        <Window x={262} y={200} lit />
        <Window x={344} y={200} lit />

        {/* Door */}
        <rect x="306" y="224" width="26" height="50" rx="1.5" fill="#f7fbfd" stroke="#0b3153" strokeWidth="1.6" />
        <circle cx="327" cy="250" r="1.8" fill="#0b3153" opacity=".6" />

        {/* Wind-driven rain, angled at the envelope */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${44 + i * 28} ${84 + i * 7}L${92 + i * 28} ${138 + i * 7}`}
            stroke="#13cbd3"
            strokeWidth="2.1"
            strokeLinecap="round"
            opacity={0.78 - i * 0.07}
          />
        ))}
        {/* Gust curve toward the eave */}
        <path d="M138 104C190 96 230 112 262 146" stroke="#0878b7" strokeWidth="2" fill="none" strokeDasharray="5 7" strokeLinecap="round" opacity=".7" />
        <path d="M252 140L266 148L252 156" stroke="#0878b7" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Intrusion markers: roof edge and window head */}
        <circle cx="232" cy="178" r="10" fill="#13cbd3" opacity=".22" />
        <circle cx="232" cy="178" r="4.2" fill="#0878b7" />
        <circle cx="262" cy="206" r="10" fill="#13cbd3" opacity=".22" />
        <circle cx="262" cy="206" r="4.2" fill="#0878b7" />

        {/* Ambient humidity band through the structure */}
        <path d="M150 246C238 238 332 250 514 238" stroke="#0878b7" strokeWidth="1.4" fill="none" strokeDasharray="3 6" opacity=".5" />
      </svg>
    );
  }

  if (terrain === "hillside") {
    return (
      <svg className="ri26-terrain-svg" viewBox="0 0 520 360" role="img" aria-label="Cross-section of a hillside property showing runoff travelling downslope into a lower level">
        <Defs />

        {/* Slope profile and soil */}
        <path d="M0 102C118 116 206 192 296 232C378 268 448 280 520 284L520 360L0 360Z" fill="url(#td-slope)" />
        <path d="M0 102C118 116 206 192 296 232C378 268 448 280 520 284" stroke="#0b3153" strokeWidth="2.1" fill="none" opacity=".42" />
        <path d="M0 126C118 140 206 214 296 254C378 290 448 300 520 304" stroke="#0b3153" strokeWidth="1" fill="none" opacity=".18" strokeDasharray="6 8" />

        {/* Upper structure */}
        <path d="M92 170H204" stroke="#0b3153" strokeWidth="3" strokeLinecap="round" />
        <rect x="96" y="124" width="104" height="46" fill="#fff" stroke="#0b3153" strokeWidth="2.1" />
        {[134, 146, 158].map((y) => (
          <path key={y} d={`M96 ${y}H200`} stroke="#0b3153" strokeWidth=".8" opacity=".12" />
        ))}
        <Roof cx={148} apexY={84} halfSpan={62} eaveY={124} />
        <Window x={110} y={136} w={28} h={22} />
        <Window x={156} y={136} w={28} h={22} />

        {/* Lower structure, where water arrives */}
        <path d="M322 300H478" stroke="#0b3153" strokeWidth="3.4" strokeLinecap="round" />
        <rect x="328" y="224" width="144" height="76" fill="#fff" stroke="#0b3153" strokeWidth="2.2" />
        {[236, 250].map((y) => (
          <path key={y} d={`M328 ${y}H472`} stroke="#0b3153" strokeWidth=".8" opacity=".12" />
        ))}
        <Roof cx={400} apexY={176} halfSpan={84} eaveY={224} />
        <Window x={346} y={236} w={30} h={24} lit />
        <Window x={424} y={236} w={30} h={24} lit />

        {/* Lower level / garage — the wet assembly */}
        <rect x="334" y="264" width="132" height="36" fill="#e7f6fe" stroke="#0878b7" strokeWidth="1.9" />
        <path d="M334 264H466" stroke="#0878b7" strokeWidth="1.9" />
        {/* Garage door panels */}
        {[272, 280, 288].map((y) => (
          <path key={y} d={`M340 ${y}H460`} stroke="#0878b7" strokeWidth=".9" opacity=".35" />
        ))}
        {/* Base plate / footing */}
        <path d="M322 306H478" stroke="#0b3153" strokeWidth="1.4" opacity=".4" strokeLinecap="round" />

        {/* Runoff: surface path downslope */}
        <path d="M150 180C196 210 244 242 300 258C338 270 322 272 348 278" stroke="#13cbd3" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeDasharray="8 8" opacity=".9" />
        <path d="M56 136C110 156 166 198 222 226" stroke="#13cbd3" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="5 7" opacity=".5" />
        {/* Subsurface path under the slope */}
        <path d="M172 206C224 240 280 264 330 282" stroke="#0878b7" strokeWidth="1.7" fill="none" strokeDasharray="3 6" opacity=".55" />

        {/* Arrow into the lower level */}
        <path d="M334 272L354 280L334 288" stroke="#0878b7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Markers: entry above, arrival below */}
        <circle cx="148" cy="172" r="10" fill="#13cbd3" opacity=".22" />
        <circle cx="148" cy="172" r="4.2" fill="#0878b7" />
        <circle cx="400" cy="282" r="11" fill="#13cbd3" opacity=".26" />
        <circle cx="400" cy="282" r="4.6" fill="#0878b7" />
      </svg>
    );
  }

  // valley — slab on grade
  return (
    <svg className="ri26-terrain-svg" viewBox="0 0 520 360" role="img" aria-label="Cross-section of a slab-on-grade property showing water spreading sideways beneath the flooring">
      <Defs />

      {/* Soil below grade */}
      <path d="M44 274H476V320H44Z" fill="url(#td-soil)" />

      {/* Structure */}
      <rect x="86" y="158" width="348" height="116" fill="#fff" stroke="#0b3153" strokeWidth="2.2" />
      <Roof cx={260} apexY={76} halfSpan={192} eaveY={158} />

      {/* Interior partitions with base plates */}
      {[172, 260, 348].map((x) => (
        <g key={x}>
          <path d={`M${x} 274V178`} stroke="#0b3153" strokeWidth="1.9" opacity=".5" />
          <path d={`M${x - 7} 268H${x + 7}`} stroke="#0b3153" strokeWidth="2.4" opacity=".6" strokeLinecap="round" />
        </g>
      ))}

      {/* Windows and door */}
      <Window x={116} y={182} w={32} h={26} />
      <Window x={204} y={182} w={32} h={26} lit />
      <Window x={292} y={182} w={32} h={26} />
      <rect x={378} y={196} width={28} height={78} rx="1.5" fill="#f7fbfd" stroke="#0b3153" strokeWidth="1.6" />

      {/* Source: failed supply line in the wall */}
      <path d="M172 204V232" stroke="#0878b7" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="172" cy="236" r="13" fill="#e7f6fe" stroke="#0878b7" strokeWidth="2" />
      <path d="M172 230v12M166 236h12" stroke="#0878b7" strokeWidth="2.1" strokeLinecap="round" />

      {/* Water spreading flat beneath the floor */}
      <rect x="88" y="256" width="344" height="18" fill="url(#td-spread)" />
      <path d="M172 250C206 262 254 268 322 268C366 268 400 266 430 262" stroke="#13cbd3" strokeWidth="2.7" fill="none" strokeLinecap="round" />
      <path d="M172 250C144 260 118 264 90 264" stroke="#13cbd3" strokeWidth="2.3" fill="none" strokeLinecap="round" opacity=".7" />

      {/* Slab, DPM and footing */}
      <path d="M78 274H442" stroke="#0b3153" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M78 283H442" stroke="#0b3153" strokeWidth="1.3" opacity=".32" strokeLinecap="round" strokeDasharray="7 5" />
      <path d="M86 274V292H112V274" stroke="#0b3153" strokeWidth="1.8" fill="none" opacity=".5" />
      <path d="M408 274V292H434V274" stroke="#0b3153" strokeWidth="1.8" fill="none" opacity=".5" />

      {/* Wicking markers at each base plate */}
      {[172, 260, 348].map((x) => (
        <g key={x}>
          <circle cx={x} cy="262" r="9" fill="#13cbd3" opacity=".24" />
          <circle cx={x} cy="262" r="3.8" fill="#0878b7" />
        </g>
      ))}
    </svg>
  );
}
