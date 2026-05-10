import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Create an Account</h1>
          <p className="mt-2 text-muted-foreground">
            Start your free BizFlow AI trial today
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none border border-border bg-card rounded-xl",
            },
          }}
        />
      </div>
    </div>
  );
}
