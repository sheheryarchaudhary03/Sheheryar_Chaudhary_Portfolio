"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { sendContactMessage } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { projectTypes, type ContactField, type ContactState } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Message sent", { description: state.message });
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast.error("Message not sent", { description: state.message });
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
    }
  }, [state]);

  const error = (field: ContactField) => state.errors?.[field];
  const describedBy = (field: ContactField) => (error(field) ? `${field}-error` : undefined);
  const value = (field: ContactField) => (state.status === "error" ? state.fields?.[field] : undefined);

  return (
    <form ref={formRef} action={formAction} noValidate className="relative grid gap-5" aria-describedby="form-status">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={error("name")}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            defaultValue={value("name")}
            aria-invalid={!!error("name")}
            aria-describedby={describedBy("name")}
            required
          />
        </Field>
        <Field label="Email" htmlFor="email" error={error("email")}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            defaultValue={value("email")}
            aria-invalid={!!error("email")}
            aria-describedby={describedBy("email")}
            required
          />
        </Field>
      </div>

      <Field label="Company" htmlFor="company" optional error={error("company")}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Where do you work?"
          defaultValue={value("company")}
          aria-invalid={!!error("company")}
          aria-describedby={describedBy("company")}
        />
      </Field>

      <fieldset aria-describedby={describedBy("projectType")} className="grid gap-2.5">
        <legend className="mb-2.5 text-[13px] font-medium text-foreground/80">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={type}
                defaultChecked={value("projectType") === type}
                className="peer sr-only"
                required
              />
              <span className="inline-flex h-10 items-center rounded-full border border-input bg-background/60 px-4 text-[13.5px] text-foreground/80 transition-all duration-300 select-none peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-4 peer-focus-visible:ring-brand/30 hover:border-border-strong hover:text-foreground">
                {type}
              </span>
            </label>
          ))}
        </div>
        {error("projectType") && <ErrorText id="projectType-error">{error("projectType")}</ErrorText>}
      </fieldset>

      <Field label="Tell me about the project" htmlFor="message" error={error("message")}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Goals, timeline, budget range — anything that helps."
          defaultValue={value("message")}
          aria-invalid={!!error("message")}
          aria-describedby={describedBy("message")}
          required
        />
      </Field>

      <div className="mt-2 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p id="form-status" role="status" aria-live="polite" className={cn("text-[13px]", state.status === "error" ? "text-destructive" : "text-muted-foreground")}>
          {state.status === "idle" ? "I usually reply within a couple of working days." : state.message}
        </p>
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              Sending
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2.5">
      <Label htmlFor={htmlFor}>
        {label}
        {optional && <span className="ml-1.5 text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {error && <ErrorText id={`${htmlFor}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-[13px] text-destructive">
      {children}
    </p>
  );
}
