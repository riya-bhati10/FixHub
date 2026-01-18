import React from 'react';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to FixHub</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 p-3 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-6 p-3 border rounded" />
        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
}
