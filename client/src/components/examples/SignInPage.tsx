import { SignInPage } from '../ui/sign-in';
import heroImage from '@assets/stock_images/abstract_purple_grad_d1c38c4d.jpg';

export default function SignInPageExample() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Sign In submitted:", data);
    
    // Mock authentication success
    if (data.email && data.password) {
      alert(`Welcome! Sign in successful for ${data.email}`);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleResetPassword = () => {
    console.log("Reset Password clicked");
    alert("Reset password functionality would be implemented here");
  };

  return (
    <SignInPage
      title={<span className="font-light text-foreground tracking-tighter">Welcome</span>}
      description="Access your account and continue your journey with us"
      heroImageSrc={heroImage}
      onSignIn={handleSignIn}
      onResetPassword={handleResetPassword}
    />
  );
}