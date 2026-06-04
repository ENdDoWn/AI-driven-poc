"use client";

/**
 * ComponentRenderer — the heart of the POC.
 * Recursively maps JSON component nodes to actual React components.
 */

import type { ComponentNode } from "@/types/components";

import Navbar from "./ui/Navbar";
import Hero from "./ui/Hero";
import Heading from "./ui/Heading";
import TextBlock from "./ui/TextBlock";
import Button from "./ui/Button";
import ImageBlock from "./ui/ImageBlock";
import Card from "./ui/Card";
import Container from "./ui/Container";
import FormBlock from "./ui/FormBlock";
import Footer from "./ui/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>;

/**
 * Registry mapping component type strings to React components.
 * Uses `any` cast intentionally — runtime props from AI JSON are validated
 * by the backend Pydantic models before reaching this renderer.
 */
const COMPONENT_MAP: Record<string, AnyComponent> = {
  navbar: Navbar,
  hero: Hero,
  heading: Heading,
  text: TextBlock,
  button: Button,
  image: ImageBlock,
  card: Card,
  container: Container,
  form: FormBlock,
  footer: Footer,
};

interface ComponentRendererProps {
  components: ComponentNode[];
}

export default function ComponentRenderer({
  components,
}: ComponentRendererProps) {
  if (!components || components.length === 0) {
    return null;
  }

  return (
    <>
      {components.map((node) => {
        const Component = COMPONENT_MAP[node.type];

        if (!Component) {
          return (
            <div
              key={node.id}
              className="comp-unknown"
              title={`Unknown component type: ${node.type}`}
            >
              ⚠️ Unknown: <code>{node.type}</code>
            </div>
          );
        }

        return (
          <Component
            key={node.id}
            {...node.props}
            children={node.children}
          />
        );
      })}
    </>
  );
}
