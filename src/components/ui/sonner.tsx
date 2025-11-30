import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const defaultStyle: CSSProperties = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
};

const Toaster = ({ theme = "light", style, ...props }: ToasterProps) => (
  <Sonner
    theme={theme as ToasterProps["theme"]}
    className="toaster group"
    style={{ ...defaultStyle, ...style }}
    {...props}
  />
);

export { Toaster };
