"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { PARROT_PREFERENCE_EVENT } from "@/lib/appearance";

type SpriteState = {
  direction: number;
  mode: "flight" | "idle";
  frame: number;
};

const DISPLAY_SIZE = 64;
const HALF_DISPLAY_SIZE = DISPLAY_SIZE / 2;
const CONTENT_HALF_WIDTH = 448;
const RAIL_GUTTER = 32;
const CURSOR_LANDING_RADIUS = 72;
const CURSOR_TAKEOFF_TRAVEL = 88;
const FLIGHT_FRAME_MS = 110;
const FLIGHT_SPEED_PX_PER_SECOND = 150;
const SPRITE_FRAME_COUNT = 4;
const SPRITE_DIRECTION_COUNT = 8;

function directionFromVector(dx: number, dy: number): number {
  const degrees = (Math.atan2(dy, dx) * 180) / Math.PI;
  return Math.floor(((degrees + 360 + 22.5) % 360) / 45);
}

function clampToRightRail(x: number, y: number): readonly [number, number] {
  const railStart = window.innerWidth / 2 + CONTENT_HALF_WIDTH;
  const minX = Math.min(
    window.innerWidth - HALF_DISPLAY_SIZE,
    railStart + RAIL_GUTTER
  );
  const maxX = Math.max(minX, window.innerWidth - HALF_DISPLAY_SIZE);
  const maxY = Math.max(
    HALF_DISPLAY_SIZE,
    window.innerHeight - HALF_DISPLAY_SIZE
  );

  return [
    Math.min(Math.max(x, minX), maxX),
    Math.min(Math.max(y, HALF_DISPLAY_SIZE), maxY),
  ];
}

function placeParrot(element: HTMLElement, x: number, y: number): void {
  element.style.transform = `translate3d(${Math.round(
    x - HALF_DISPLAY_SIZE
  )}px, ${Math.round(y - HALF_DISPLAY_SIZE)}px, 0)`;
}

export function CursorBird() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, theme } = useTheme();
  const [parrotAllowed, setParrotAllowed] = useState(false);
  const [sprite, setSprite] = useState<SpriteState>({
    direction: 0,
    mode: "idle",
    frame: 0,
  });

  useEffect(() => {
    const eligibilityQuery = window.matchMedia(
      "(min-width: 1280px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const syncEligibility = () => {
      setParrotAllowed(
        eligibilityQuery.matches &&
          document.documentElement.dataset.parrotEnabled !== "false"
      );
    };
    const handlePreference = (event: Event) => {
      const enabled = (event as CustomEvent<boolean>).detail;
      setParrotAllowed(eligibilityQuery.matches && enabled);
    };

    syncEligibility();
    eligibilityQuery.addEventListener("change", syncEligibility);
    window.addEventListener(PARROT_PREFERENCE_EVENT, handlePreference);

    return () => {
      eligibilityQuery.removeEventListener("change", syncEligibility);
      window.removeEventListener(PARROT_PREFERENCE_EVENT, handlePreference);
    };
  }, []);

  useEffect(() => {
    if (!parrotAllowed) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let [positionX, positionY] = clampToRightRail(
      window.innerWidth - 72,
      window.innerHeight * 0.42
    );
    let targetX = positionX;
    let targetY = positionY;
    let restTargetX = targetX;
    let restTargetY = targetY;
    let lastFrameTime = performance.now();
    let flightStartedAt = lastFrameTime;
    let wasFlying = false;
    let direction = 0;
    let animationFrame = 0;

    placeParrot(wrapper, positionX, positionY);

    const updateSprite = (next: SpriteState) => {
      setSprite((current) =>
        current.direction === next.direction &&
        current.mode === next.mode &&
        current.frame === next.frame
          ? current
          : next
      );
    };

    const handleMouseMove = (event: MouseEvent) => {
      [targetX, targetY] = clampToRightRail(event.clientX, event.clientY);
    };

    const handleResize = () => {
      [targetX, targetY] = clampToRightRail(targetX, targetY);
      [restTargetX, restTargetY] = clampToRightRail(restTargetX, restTargetY);
      [positionX, positionY] = clampToRightRail(positionX, positionY);
      placeParrot(wrapper, positionX, positionY);
    };

    const tick = (now: number) => {
      const deltaMs = Math.min(Math.max(now - lastFrameTime, 0), 64);
      lastFrameTime = now;

      const dx = targetX - positionX;
      const dy = targetY - positionY;
      const distance = Math.hypot(dx, dy);
      const cursorTravelFromRest = Math.hypot(
        targetX - restTargetX,
        targetY - restTargetY
      );
      const shouldFly = wasFlying
        ? distance > CURSOR_LANDING_RADIUS
        : cursorTravelFromRest > CURSOR_TAKEOFF_TRAVEL;

      if (shouldFly && distance > 0) {
        if (!wasFlying) flightStartedAt = now;
        wasFlying = true;
        direction = directionFromVector(dx, dy);

        const step = Math.min(
          Math.max(0, distance - CURSOR_LANDING_RADIUS),
          (FLIGHT_SPEED_PX_PER_SECOND * deltaMs) / 1000
        );
        positionX += (dx / distance) * step;
        positionY += (dy / distance) * step;

        updateSprite({
          direction,
          mode: "flight",
          frame:
            Math.floor((now - flightStartedAt) / FLIGHT_FRAME_MS) %
            (SPRITE_FRAME_COUNT - 1),
        });
      } else {
        if (wasFlying) {
          restTargetX = targetX;
          restTargetY = targetY;
        }
        wasFlying = false;
        updateSprite({ direction, mode: "idle", frame: 0 });
      }

      placeParrot(wrapper, positionX, positionY);
      animationFrame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [parrotAllowed]);

  if (!parrotAllowed) return null;

  const useBlackSprite =
    theme === "light" ||
    theme === "sepia" ||
    (theme === "system" && resolvedTheme === "light");
  const sheetFrame = sprite.mode === "flight" ? sprite.frame + 1 : 0;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 h-16 w-16 select-none"
      style={{
        willChange: "transform",
        transform: "translate3d(110vw, 40vh, 0)",
      }}
    >
      <div
        className="h-16 w-16"
        style={{
          backgroundImage: `url(/assets/parrot/parrot-sprites-${
            useBlackSprite ? "black" : "white"
          }.png)`,
          backgroundPosition: `-${sheetFrame * DISPLAY_SIZE}px -${
            sprite.direction * DISPLAY_SIZE
          }px`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${
            DISPLAY_SIZE * SPRITE_FRAME_COUNT
          }px ${DISPLAY_SIZE * SPRITE_DIRECTION_COUNT}px`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
