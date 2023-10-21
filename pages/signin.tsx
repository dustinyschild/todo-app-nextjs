import { SignIn } from "@clerk/nextjs";
import styles from "../styles/Signin.module.css"
export default function SignInPage() {
  return (
    <div className={styles.signInContainer}>
      <SignIn />
    </div>
  );
}
