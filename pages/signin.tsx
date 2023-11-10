import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <SignIn redirectUrl="/" />
    </div>
  );
}
