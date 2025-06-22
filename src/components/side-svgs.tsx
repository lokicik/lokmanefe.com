// No explicit React import needed with Next.js/React 17+ JSX transform

export function SideSvgs() {
  return (
    <div
      className="decorative-svg fixed inset-0 pointer-events-none select-none z-0 hidden lg:block"
      style={{
        backgroundImage: 'url("/untitled.svg")',
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        opacity: 0.25,
      }}
      aria-hidden="true"
    />
  );
}
