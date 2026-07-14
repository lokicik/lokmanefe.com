"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

type SpriteState = {
  direction: number;
  mode: "flight" | "idle";
  frame: number;
};

const DISPLAY_SIZE = 64;
const HALF_DISPLAY_SIZE = DISPLAY_SIZE / 2;
const CURSOR_LANDING_RADIUS = 96;
const CURSOR_TAKEOFF_TRAVEL = 110;
const FLIGHT_FRAME_MS = 110;
const FLIGHT_SPEED_PX_PER_SECOND = 140;
const SPRITE_FRAME_COUNT = 4;
const SPRITE_DIRECTION_COUNT = 8;

function directionFromVector(dx: number, dy: number): number {
  const degrees = (Math.atan2(dy, dx) * 180) / Math.PI;
  return Math.floor(((degrees + 360 + 22.5) % 360) / 45);
}

function clampPoint(x: number, y: number): readonly [number, number] {
  const maxX = Math.max(HALF_DISPLAY_SIZE, window.innerWidth - HALF_DISPLAY_SIZE);
  const maxY = Math.max(
    HALF_DISPLAY_SIZE,
    window.innerHeight - HALF_DISPLAY_SIZE,
  );

  return [
    Math.min(Math.max(x, HALF_DISPLAY_SIZE), maxX),
    Math.min(Math.max(y, HALF_DISPLAY_SIZE), maxY),
  ];
}

function placeParrot(element: HTMLDivElement, x: number, y: number): void {
  const left = Math.round(x - HALF_DISPLAY_SIZE);
  const top = Math.round(y - HALF_DISPLAY_SIZE);
  element.style.transform = `translate3d(${left}px, ${top}px, 0)`;
}

export function CursorBird() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, theme } = useTheme();
  const [motionAllowed, setMotionAllowed] = useState<boolean | null>(null);
  const [sprite, setSprite] = useState<SpriteState>({
    direction: 0,
    mode: "idle",
    frame: 0,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setMotionAllowed(!mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;


    let [positionX, positionY] = clampPoint(
      window.innerWidth / 2,
      window.innerHeight / 2,
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
          : next,
      );
    };

    const updateTarget = (x: number, y: number) => {
      [targetX, targetY] = clampPoint(x, y);
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateTarget(event.clientX, event.clientY);
    };

    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0] ?? event.changedTouches[0];
      if (touch) updateTarget(touch.clientX, touch.clientY);
    };

    const handleResize = () => {
      [targetX, targetY] = clampPoint(targetX, targetY);
      [restTargetX, restTargetY] = clampPoint(restTargetX, restTargetY);
      [positionX, positionY] = clampPoint(positionX, positionY);
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
        targetY - restTargetY,
      );

      const shouldFly = wasFlying
        ? distance > CURSOR_LANDING_RADIUS
        : cursorTravelFromRest > CURSOR_TAKEOFF_TRAVEL;

      if (shouldFly) {
        if (!wasFlying) flightStartedAt = now;
        wasFlying = true;
        direction = directionFromVector(dx, dy);

        const step = Math.min(
          distance - CURSOR_LANDING_RADIUS,
          (FLIGHT_SPEED_PX_PER_SECOND * deltaMs) / 1000,
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
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("resize", handleResize);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("resize", handleResize);
    };
  }, [motionAllowed]);

  if (!motionAllowed) return null;

  const useBlackSprite =
    theme === "light" ||
    theme === "sepia" ||
    (theme === "system" && resolvedTheme === "light");
  const sheetFrame = sprite.mode === "flight" ? sprite.frame + 1 : 0;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 40,
        width: DISPLAY_SIZE,
        height: DISPLAY_SIZE,
        pointerEvents: "none",
        userSelect: "none",
        willChange: "transform",
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      <div
        style={{
          width: DISPLAY_SIZE,
          height: DISPLAY_SIZE,
          backgroundImage: `url(/assets/parrot/parrot-sprites-${useBlackSprite ? "black" : "white"}.png)`,
          backgroundPosition: `-${sheetFrame * DISPLAY_SIZE}px -${sprite.direction * DISPLAY_SIZE}px`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${DISPLAY_SIZE * SPRITE_FRAME_COUNT}px ${DISPLAY_SIZE * SPRITE_DIRECTION_COUNT}px`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}