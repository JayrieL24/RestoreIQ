import Image from "next/image";

const carriers = [
  { name: "State Farm", src: "/logos/insurance/state-farm.svg", width: 200, height: 28, compact: false },
  { name: "Farmers Insurance", src: "/logos/insurance/farmers.svg", width: 252, height: 135, compact: true },
  { name: "Allstate", src: "/logos/insurance/allstate.svg", width: 1547, height: 328, compact: false },
  { name: "USAA", src: "/logos/insurance/usaa.svg", width: 63, height: 63, compact: true },
  { name: "Liberty Mutual", src: "/logos/insurance/liberty-mutual.svg", width: 1024, height: 245, compact: false },
  { name: "Travelers", src: "/logos/insurance/travelers.svg", width: 250, height: 58, compact: false },
  { name: "Nationwide", src: "/logos/insurance/nationwide.svg", width: 80, height: 83, compact: true },
  { name: "AAA", src: "/logos/insurance/aaa.svg", width: 501, height: 317, compact: true },
] as const;

export function InsuranceBanner() {
  return (
    <div
      className="ri26-carrier"
      aria-label={`Insurance carriers including ${carriers.map(({ name }) => name).join(", ")}`}
    >
      <div className="ri26-carrier-track" aria-hidden="true">
        {[...carriers, ...carriers].map((carrier, index) => (
          <span
            className={carrier.compact ? "ri26-carrier-logo ri26-carrier-logo-compact" : "ri26-carrier-logo"}
            key={`${carrier.name}-${index}`}
          >
            <Image
              src={carrier.src}
              alt=""
              width={carrier.width}
              height={carrier.height}
              sizes="160px"
              unoptimized
            />
          </span>
        ))}
      </div>
    </div>
  );
}
