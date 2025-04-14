import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  type: 'student' | 'admin';
  onRegisterClick?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ type, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      await login(email, password);
      // If login is successful, you might want to redirect the user
      // For example:
      // navigate('/dashboard');
    } catch (err) {
      setFormError((err as Error).message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="card p-8">
        <div className="flex items-center justify-center mb-6">
          <LogIn className="w-8 h-8 text-primary-400" />
          <h2 className="ml-2 text-2xl font-bold text-primary-400">
            {type === 'admin' ? 'Admin Login' : 'Student Login'}
          </h2>
        </div>
        
        {(formError || error) && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {formError || error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="input shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="input shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="btn-primary py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-lg shadow-primary-500/30"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {type === 'student' && onRegisterClick && (
            <button
              type="button"
              onClick={onRegisterClick}
              className="inline-block align-baseline font-bold text-sm text-primary-400 hover:text-primary-300"
            >
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
};