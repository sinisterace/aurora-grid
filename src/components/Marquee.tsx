import type { CSSProperties, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Lower is faster. */
  duration?: number;
  /** Pause while hovered. */
  pauseOnHover?: boolean;
  reverse?: boolean;
  /** Fade the left and right edges. */
  fadeEdges?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Seamless CSS marquee. The content is rendered twice and the track slides by
 * half its width (the `marquee` keyframe in aurora.css), so the loop has no seam.
 * Honors prefers-reduced-motion.
 */
export function Marquee({
  children,
  duration = 32,
  pauseOnHover = true,
  reverse = false,
  fadeEdges = true,
  className,
  ariaLabel,
}: MarqueeProps) {
  const style = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      className={cn(
        "group/marquee relative overflow-hidden",
        fadeEdges &&
          "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee motion-reduce:animate-none",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={style}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
