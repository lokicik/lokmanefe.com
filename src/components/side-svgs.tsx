import Image from "next/image";

const marginBirds = [
  {
    src: "/bird-svgrepo-com (1).svg",
    className: "left-[max(3rem,calc(50%-46rem))] top-[18%] w-32",
  },
  {
    src: "/bird-svgrepo-com (2).svg",
    className: "left-[max(5rem,calc(50%-43rem))] top-[68%] w-28",
  },
  {
    src: "/bird-svgrepo-com (6).svg",
    className: "right-[max(3rem,calc(50%-46rem))] top-[26%] w-32",
  },
  {
    src: "/bird-svgrepo-com (7).svg",
    className: "right-[max(5rem,calc(50%-43rem))] top-[74%] w-28",
  },
];

export function SideSvgs() {
  return (
    <div
      className="decorative-svg pointer-events-none fixed inset-0 z-0 hidden select-none opacity-[0.13] min-[1720px]:block"
      aria-hidden="true"
    >
      {marginBirds.map((bird) => (
        <Image
          key={bird.src}
          src={bird.src}
          alt=""
          width={160}
          height={160}
          className={`absolute h-auto ${bird.className}`}
        />
      ))}
    </div>
  );
}
