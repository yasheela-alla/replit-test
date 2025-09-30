import { SignInPage } from '@/components/ui/sign-in';
import heroImage from '@assets/stock_images/abstract_purple_grad_d1c38c4d.jpg';

interface LoginPageProps {
  onLoginSuccess: (user: { id: string; name: string; email: string; role: 'manager' | 'creative_team' | 'digital_marketer'; }) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as 'manager' | 'creative_team' | 'digital_marketer';

    if (!email || !password || !role) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Simulate authentication with demo users
      const demoUsers = [
        { id: '1', email: 'manager@emmadi.com', password: 'admin123', name: 'Sarah Johnson', role: 'manager' as const },
        { id: '2', email: 'creative@emmadi.com', password: 'creative123', name: 'Alex Chen', role: 'creative_team' as const },
        { id: '3', email: 'dm@emmadi.com', password: 'marketing123', name: 'Maria Rodriguez', role: 'digital_marketer' as const },
        { id: '4', email: 'pradeep@emmadi.com', password: 'demo123', name: 'Pradeep Kumar', role: 'creative_team' as const }
      ];

      const user = demoUsers.find(u => u.email === email && u.password === password && u.role === role);
      
      if (user) {
        console.log('Login successful:', user);
        setTimeout(() => {
          onLoginSuccess({ id: user.id, name: user.name, email: user.email, role: user.role });
        }, 300);
      } else {
        alert('Invalid credentials. Try:\n\nManager: manager@emmadi.com / admin123\nCreative: creative@emmadi.com / creative123\nDigital Marketing: dm@emmadi.com / marketing123');
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