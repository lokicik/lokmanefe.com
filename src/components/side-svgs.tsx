import Image from "next/image";

const leftBirds = [
  {
    src: "/bird-svgrepo-com (4).svg",
    className: "right-20 top-[7%] w-24",
  },
  {
    src: "/bird-svgrepo-com (1).svg",
    className: "right-14 top-[40%] w-32",
  },
  {
    src: "/bird-svgrepo-com (2).svg",
    className: "right-20 top-[76%] w-28",
  },
];

const rightBirds = [
  {
    src: "/bird-svgrepo-com (9).svg",
    className: "left-20 top-[16%] w-24",
  },
  {
    src: "/bird-svgrepo-com (6).svg",
    className: "left-14 top-[55%] w-32",
  },
  {
    src: "/bird-svgrepo-com (7).svg",
    className: "left-20 top-[90%] w-28",
  },
];

function BirdRail({
  side,
  birds,
}: {
  side: "left" | "right";
  birds: typeof leftBirds;
}) {
  return (
    <aside
      className={`decorative-svg pointer-events-none relative row-start-1 hidden min-h-full select-none overflow-hidden opacity-[0.16] min-[1280px]:block ${
        side === "left" ? "col-start-1" : "col-start-3"
      }`}
      aria-hidden="true"
    >
      {birds.map((bird) => (
        <Image
          key={bird.src}
          src={bird.src}
          alt=""
          width={160}
          height={160}
          className={`absolute h-auto ${bird.className}`}
        />
      ))}
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
