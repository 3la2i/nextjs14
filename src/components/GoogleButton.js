'use client';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { signIn } from "next-auth/react";

function GoogleButton() {
  const handleGoogleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/", redirect: false });
  
    if (result?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Something went wrong, please try again!',
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full mt-5 px-6 py-3 rounded-md bg-white text-[#588b49f3] border border-[#588b49f3] shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#588b49f3]"
    >
      <FaGoogle className="text-[#588b49f3] mr-3 text-xl" />
      <span className="text-sm font-medium">Sign in with Google</span>
    </button>
  );
}

export default GoogleButton;