"use client"

import { handleLogout } from '@/app/actions/auth-actions';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter()

  const onLogout = async () => {
    await handleLogout()
    router.push("/auth");
  };


  return (
    <button onClick={onLogout} type="submit">
      Logout
    </button>
  );
}

export default LogoutButton;