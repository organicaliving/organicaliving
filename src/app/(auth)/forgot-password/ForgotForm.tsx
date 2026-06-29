"use client";
import { useActionState } from "react";
import { requestPasswordResetAction } from "@/lib/auth/actions";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { fieldError } from "@/lib/forms";

export function ForgotForm() {
  const [state, action] = useActionState(requestPasswordResetAction, null);
  if (state?.ok) return <p className="text-sm text-ink">If that email exists, a reset link is on its way.</p>;
  return (
    <form action={action} className="flex flex-col gap-4">
      <h1 className="text-2xl font-light text-ink">Reset password</h1>
      {state && !state.ok ? <p className="text-sm text-[#b3261e]">{state.error}</p> : null}
      <FormField label="Email" htmlFor="email" error={fieldError(state, "email")}>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </FormField>
      <SubmitButton>Send reset link</SubmitButton>
    </form>
  );
}
