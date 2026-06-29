"use client";
import { useActionState } from "react";
import { updatePasswordAction } from "@/lib/auth/actions";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { fieldError } from "@/lib/forms";

export function ResetForm() {
  const [state, action] = useActionState(updatePasswordAction, null);
  return (
    <form action={action} className="flex flex-col gap-4">
      <h1 className="text-2xl font-light text-ink">Choose a new password</h1>
      {state && !state.ok ? <p className="text-sm text-[#b3261e]">{state.error}</p> : null}
      <FormField label="New password" htmlFor="password" error={fieldError(state, "password")}>
        <Input id="password" name="password" type="password" autoComplete="new-password" required />
      </FormField>
      <SubmitButton>Update password</SubmitButton>
    </form>
  );
}
