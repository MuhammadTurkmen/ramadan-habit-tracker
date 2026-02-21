import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="text-muted-foreground">
          We’ve sent you a verification email.
          <br />
          Please check your inbox and your <b>spam folder</b>. after
          verification{" "}
          <Link href="/login" className="underline">
            click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}
