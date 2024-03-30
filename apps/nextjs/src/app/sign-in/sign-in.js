'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleError = err =>
    toast.error(err, {
      position: 'bottom-left'
    });
  const handleSuccess = msg =>
    toast.success(msg, {
      position: 'bottom-left'
    });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { res } = await axios.post(
        'http://localhost:3001/api/auth/user/login',
        {
          username,
          password
        }
      );
      console.log(res);
      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="usernmame"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Sign In
        </button>
      </form>
      <Link href="/sign-up">
        <button className="mt-4 text-blue-500">Not a user? Register now</button>
      </Link>
    </div>
  );
}
