"use client";

import type { FormProps } from "@/types/components";

export default function FormBlock({ fields, submitText = "Submit" }: FormProps) {
  return (
    <form className="comp-form" onSubmit={(e) => e.preventDefault()}>
      {fields?.map((field, i) => (
        <div key={i} className="form-field">
          <label className="form-label">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              className="form-input form-textarea"
              placeholder={field.placeholder || ""}
              rows={4}
            />
          ) : (
            <input
              className="form-input"
              type={field.type}
              placeholder={field.placeholder || ""}
            />
          )}
        </div>
      ))}
      <button type="submit" className="comp-button comp-button--primary comp-button--medium">
        {submitText}
      </button>
    </form>
  );
}
