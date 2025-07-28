import { AuthForm } from "@/components/auth-form"
import { PageTransition } from "@/components/page-transition"

export default function SignUpPage() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12 md:py-24">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center">Create an Account</h1>
        <AuthForm mode="sign-up" />
      </div>
    </PageTransition>
  )
}
