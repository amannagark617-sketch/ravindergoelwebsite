import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "clear" | "ink";
  size?: "sm" | "md";
  external?: boolean;
  "aria-current"?: "page";
};

/* Liquid glass button: a distortion filter over whatever sits behind it,
   a hairline lit edge, and a label above both. */
export default function LiquidButton({ href, children, variant = "clear", size = "md", external, ...rest }: Props) {
  const cls = `lb lb-${variant} lb-${size}`;
  const inner = (
    <>
      <span className="lb-glass" aria-hidden="true" />
      <span className="lb-edge" aria-hidden="true" />
      <span className="lb-label">{children}</span>
    </>
  );
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={href} {...rest}>
      {inner}
    </Link>
  );
}

/* Rendered once, in the header. Chromium applies it to backdrop-filter;
   other browsers fall back to a plain blur. */
export function GlassFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
