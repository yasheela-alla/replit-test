import { SignInPage } from '@/components/ui/sign-in';
import heroImage from '@assets/stock_images/abstract_purple_grad_d1c38c4d.jpg';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; role: 'manager' | 'creative_team' | 'digital_marketer'; }) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // TODO: Replace with actual API call
      // Simulate authentication with demo users
      const demoUsers = [
        { email: 'manager@company.com', password: 'manager123', name: 'Sarah Johnson', role: 'manager' },
        { email: 'creative@company.com', password: 'creative123', name: 'Alex Chen', role: 'creative_team' },
        { email: 'marketing@company.com', password: 'marketing123', name: 'Maria Rodriguez', role: 'digital_marketer' }
      ];

      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        console.log('Login successful:', user);
        onLoginSuccess(user);
      } else {
        alert('Invalid email or password. Try:\n\nManager: manager@company.com / manager123\nCreative: creative@company.com / creative123\nMarketing: marketing@company.com / marketing123');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleResetPassword = () => {
    console.log('Reset Password clicked');
    alert('Reset password functionality would send an email with reset instructions');
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