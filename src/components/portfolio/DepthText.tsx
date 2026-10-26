import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import './DepthText.css';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type DepthTextProps = {
  text?: string;
  layers?: number;
  depth?: number;
  faceColor?: string;
  depthColor?: string;
  gradientDepth?: boolean;
  tilt?: number;
  pointerTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  orbitSpeed?: number;
  hoverPush?: number;
  float?: boolean;
  fontSize?: string;
  fontWeight?: number | string;
  shadow?: boolean;
  outline?: boolean;
  intro?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function DepthText({
  text = 'Elevate',
  layers = 34,
  depth = 2.4,
  faceColor = 'currentColor',
  depthColor = '#7c3aed',
  gradientDepth = false,
  tilt = 7.5,
  pointerTracking = true,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = true,
  orbitSpeed = 0.35,
  hoverPush = 0,
  float = false,
  fontSize = 'clamp(3rem, 12vw, 7rem)',
  fontWeight = 900,
  shadow = true,
  outline = false,
  intro = true,
  className = '',
  style = {},
}: DepthTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);
  const introProgressRef = useRef<number>(intro ? 0 : 1);
  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, 64);
  const safeDepth = clamp(Number(depth) || 0, 0, 12);
  const safeTilt = clamp(Number(tilt) || 0, 0, 12);

  const layerStyles = useMemo(
    () =>
      Array.from({ length: safeLayers }, (_, i) => {
        const index = safeLayers - i;
        const progress = index / safeLayers;
        const alpha = Math.max(0, 1 - progress * progress);
        const color = gradientDepth
          ? `color-mix(in srgb, ${depthColor} ${Math.round(alpha * 100)}%, transparent)`
          : `color-mix(in srgb, ${faceColor} ${Math.round((1 - progress) * 62)}%, ${depthColor})`;
        return {
          index,
          color,
          transform: `translateZ(calc(var(--depth-grow, 1) * ${-index * safeDepth}px))`,
        };
      }),
    [safeLayers, safeDepth, faceColor, depthColor, gradientDepth],
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canTrack = pointerTracking && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reducedMotion;
    const start = performance.now();
    let frame = 0;
    let lastTime = 0;
    let activePointer = false;
    let targetX = -safeTilt * 0.32;
    let targetY = safeTilt * 0.42;
    let currentX = targetX;
    let currentY = targetY;
    let visible = true;

    const tick = (now: number) => {
      const delta = lastTime ? Math.min(now - lastTime, 50) : 16;
      lastTime = now;
      const elapsed = (now - start) / 1000;

      if (intro && introProgressRef.current < 1) {
        introProgressRef.current = Math.min(1, elapsed * 1000 / 1200);
      }

      if (autoOrbit && (!canTrack || !activePointer)) {
        const angle = elapsed * clamp(Number(orbitSpeed) || 0, 0, 2) * Math.PI * 2;
        const amount = canTrack ? 0.15 : 0.42;
        targetX = -safeTilt * 0.32 + Math.sin(angle) * safeTilt * amount;
        targetY = safeTilt * 0.42 + Math.cos(angle * 0.85) * safeTilt * amount;
      }

      const ease = clamp(Number(smoothing) || 0.14, 0.02, 0.35);
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      const floatY = float && !reducedMotion ? Math.sin(elapsed * 1.3) * 4 : 0;
      const roll = float && !reducedMotion ? Math.sin(elapsed) * 1.2 : 0;
      stage.style.transform = `translateY(${floatY}px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) rotateZ(${roll.toFixed(2)}deg)`;
      stage.style.setProperty('--depth-grow', String(reducedMotion || !intro ? 1 : introProgressRef.current));

      if (visible && (autoOrbit || canTrack || (intro && introProgressRef.current < 1) || float)) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      activePointer = true;
      const x = clamp((event.clientX - rect.left - rect.width / 2) / (rect.width * 0.8), -1, 1);
      const y = clamp((event.clientY - rect.top - rect.height / 2) / (rect.height * 0.8), -1, 1);
      targetX = -safeTilt * 0.32 - y * safeTilt;
      targetY = safeTilt * 0.42 + x * safeTilt;
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const onPointerLeave = () => {
      activePointer = false;
      targetX = -safeTilt * 0.32;
      targetY = safeTilt * 0.42;
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          if (!entry) return;
          visible = entry.isIntersecting;
          if (visible && !frame) frame = requestAnimationFrame(tick);
          if (!visible && frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        })
      : null;
    observer?.observe(root);

    if (canTrack) {
      root.addEventListener('pointermove', onPointerMove);
      root.addEventListener('pointerleave', onPointerLeave);
    }

    if (!reducedMotion) frame = requestAnimationFrame(tick);
    else stage.style.setProperty('--depth-grow', '1');

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [autoOrbit, orbitSpeed, pointerTracking, safeTilt, smoothing, intro, float]);

  return (
    <span
      ref={rootRef}
      className={`depth-text ${outline ? 'depth-text--outline' : ''} ${className}`.trim()}
      style={{
        ...style,
        '--depth-perspective': `${clamp(Number(perspective) || 900, 300, 2000)}px`,
        '--depth-font-size': fontSize,
        '--depth-font-weight': fontWeight,
        '--depth-face-color': faceColor,
        '--depth-shadow': shadow
          ? `0 0.18em 0.32em color-mix(in srgb, ${depthColor} 25%, rgba(0,0,0,.45))`
          : 'none',
      } as CSSProperties}
    >
      <span ref={stageRef} className="depth-text__stage">
        {layerStyles.map((layer) => (
          <span
            aria-hidden="true"
            className={`depth-text__layer ${layer.index === safeLayers ? 'depth-text__layer--back' : ''}`}
            key={layer.index}
            style={{ color: layer.color, transform: layer.transform }}
          >
            {text}
          </span>
        ))}
        <span className="depth-text__face">{text}</span>
      </span>
    </span>
  );
}
