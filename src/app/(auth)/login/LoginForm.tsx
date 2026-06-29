"use client";
import { useActionState } from "react";
import Link from "next/link";
import { signInAction } from "@/lib/auth/actions";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { fieldError } from "@/lib/forms";

export function LoginForm() {
  const [state, action] = useActionState(signInAction, null);
  return (
    <form action={action} className="flex flex-col gap-4">
      <h1 className="text-2xl font-light text-ink">Sign in</h1>
      {state && !state.ok ? <p className="text-sm text-[#b3261e]">{state.error}</p> : null}
      <FormField label="Email" htmlFor="email" error={fieldError(state, "email")}>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </FormField>
      <FormField label="Password" htmlFor="password" error={fieldError(state, "password")}>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </FormField>
      <SubmitButton>Sign In</SubmitButton>
      <div className="flex justify-between text-sm text-muted">
        <Link href="/forgot-password" className="hover:text-ink">Forgot password?</Link>
        <Link href="/signup" className="hover:text-ink">Create account</Link>
      </div>
    </form>
  );
}
