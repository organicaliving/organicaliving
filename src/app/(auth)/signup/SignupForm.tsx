"use client";
import { useActionState } from "react";
import Link from "next/link";
import { signUpAction } from "@/lib/auth/actions";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { fieldError } from "@/lib/forms";

export function SignupForm({ refCode }: { refCode?: string }) {
  const [state, action] = useActionState(signUpAction, null);
  if (state?.ok) {
    return <p className="text-sm text-ink">Check your email to confirm your account, then sign in.</p>;
  }
  return (
    <form action={action} className="flex flex-col gap-4">
      <h1 className="text-2xl font-light text-ink">Create account</h1>
      {refCode ? <input type="hidden" name="ref" value={refCode} /> : null}
      {state && !state.ok ? <p className="text-sm text-[#b3261e]">{state.error}</p> : null}
      <FormField label="Full name" htmlFor="fullName" error={fieldError(state, "fullName")}>
        <Input id="fullName" name="fullName" autoComplete="name" required />
      </FormField>
      <FormField label="Email" htmlFor="email" error={fieldError(state, "email")}>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </FormField>
      <FormField label="Password" htmlFor="password" error={fieldError(state, "password")}>
        <Input id="password" name="password" type="password" autoComplete="new-password" required />
      </FormField>
      <SubmitButton>Create Account</SubmitButton>
      <p className="text-sm text-muted">Already have an account? <Link href="/login" className="hover:text-ink">Sign in</Link></p>
    </form>
  );
}
