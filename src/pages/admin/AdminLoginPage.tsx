import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '@/config/studioConfig';
import { Lock, Mail, Key, ArrowLeft, Database, ShieldCheck } from 'lucide-react';
import { authService } from '@/services/authService';
import { supabase } from '@/services/supabaseClient';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const { user, error } = await authService.login(email, password);
      setIsLoading(false);

      if (error || !user) {
        setErrorMsg(error?.message || 'Invalid email or password. Please try again.');
        return;
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err?.message || 'An unexpected error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Studio Website</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center mx-auto border border-amber-200/80">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
              Studio Owner Portal
            </h1>
            <p className="text-xs text-stone-500">
              {STUDIO_CONFIG.name}
            </p>
          </div>

          {/* Production Storage Note */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
              <Database className="w-3.5 h-3.5" />
              <span>Production Management Mode:</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Connected to <strong>Supabase Production Cloud</strong>. Authenticate with your administrator credentials to manage studio appointments, portfolio gallery, and pricing.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Owner Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying Identity...' : 'Sign In to Management Console'}
            </button>
          </form>
        </div>

        <p className="text-[11px] text-stone-500 text-center">
          Secure admin area for studio appointments, portfolio edits, and price configurations.
        </p>

      </div>
    </div>
  );
};
