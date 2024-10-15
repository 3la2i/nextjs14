// src/app/login/page.js
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <div className="min-h-screen ">
      {/* <Navbar /> */}
      <div className="container mx-auto px-4">
        <LoginForm />
      </div>
    </div>
  );
}