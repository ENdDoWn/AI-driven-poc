/**
 * TypeScript types matching the backend Pydantic models.
 * Defines the JSON schema for the component tree.
 */

export interface ComponentNode {
  id: string;
  type: ComponentType;
  props: Record<string, unknown>;
  children: ComponentNode[];
}

export type ComponentType =
  | "navbar"
  | "hero"
  | "heading"
  | "text"
  | "button"
  | "image"
  | "card"
  | "container"
  | "form"
  | "footer";

/* ───── Per-component prop interfaces ───── */

export interface NavbarProps {
  brand: string;
  links: { text: string; href: string }[];
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundGradient?: string;
  align?: "left" | "center" | "right";
}

export interface HeadingProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "left" | "center" | "right";
}

export interface TextProps {
  text: string;
  align?: "left" | "center" | "right";
  fontSize?: string;
}

export interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface ContainerProps {
  direction?: "row" | "column";
  gap?: string;
  padding?: string;
  maxWidth?: string;
  align?: "start" | "center" | "end";
  wrap?: boolean;
  backgroundColor?: string;
}

export interface FormField {
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
}

export interface FormProps {
  fields: FormField[];
  submitText?: string;
}

export interface FooterProps {
  text: string;
  links?: { text: string; href: string }[];
  backgroundColor?: string;
}

/* ───── API types ───── */

export interface GenerateRequest {
  prompt: string;
  current_json?: ComponentNode[] | null;
}

export interface GenerateResponse {
  components: ComponentNode[];
  prompt_used: string;
}
