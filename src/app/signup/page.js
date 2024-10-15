// src/app/signup/page.js
import SignupForm from '@/components/SignupForm';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  return (
    <div className="min-h-screen ">
      {/* <Navbar /> */}
      <div className="container mx-auto px-4">
        <SignupForm />
      </div>
    </div>
  );
}