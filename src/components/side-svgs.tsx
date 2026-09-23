import Image from "next/image";

const leftBirds = [
  { src: "/bird-svgrepo-com (4).svg", className: "right-24 w-24" },
  { src: "/bird-svgrepo-com (1).svg", className: "right-20 w-32" },
  { src: "/bird-svgrepo-com (2).svg", className: "right-24 w-28" },
  { src: "/bird-svgrepo-com (3).svg", className: "right-20 w-24" },
  { src: "/bird-svgrepo-com (5).svg", className: "right-24 w-28" },
];

const rightBirds = [
  { src: "/bird-svgrepo-com (9).svg", className: "left-24 w-24" },
  { src: "/bird-svgrepo-com (6).svg", className: "left-20 w-32" },
  { src: "/bird-svgrepo-com (7).svg", className: "left-24 w-28" },
  { src: "/bird-svgrepo-com (8).svg", className: "left-20 w-24" },
  { src: "/bird-svgrepo-com.svg", className: "left-24 w-28" },
];

const birdCountPerSide = 14;
const birdSpacingRem = 34;

function BirdRail({
  side,
  birds,
}: {
  side: "left" | "right";
  birds: typeof leftBirds;
}) {
  return (
    <aside
      className={`decorative-svg pointer-events-none relative row-start-1 hidden min-h-full select-none overflow-hidden min-[1280px]:block ${
        side === "left" ? "col-start-1" : "col-start-3"
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: birdCountPerSide }, (_, index) => {
        const bird = birds[index % birds.length];
        const top = (side === "left" ? 7 : 22) + index * birdSpacingRem;

        return (
          <Image
            key={`${bird.src}-${index}`}
            src={bird.src}
            alt=""
            width={160}
            height={160}
            style={{ top: `${top}rem` }}
            className={`bird-decoration absolute h-auto ${bird.className}`}
          />
        );
      })}
    </aside>
  );
}

export function SideSvgs() {
  return (
    <>
      <BirdRail side="left" birds={leftBirds} />
      <BirdRail side="right" birds={rightBirds} />
    </>
  );
}
