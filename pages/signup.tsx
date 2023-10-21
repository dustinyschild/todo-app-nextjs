import { SignUp } from "@clerk/nextjs";
import styles from "../styles/Signin.module.css"
export default function SignUpPage() {
  return (<div className= {styles.signInContainer}> <SignUp />
</div>
)}
