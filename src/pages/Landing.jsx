import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function Landing() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError('');
    setMessage('');

    if (isSignUp) {
      const { error } = await signUp(email.trim(), password);
      if (error) {
        setError(error.message);
      } else {
        setMessage('Account created! You can now sign in.');
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-6">

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <span className="font-inter font-black text-primary-foreground text-xl">CAM</span>
          </div>
          <div>
            <h1 className="font-inter font-bold text-2xl">AM Accelerator</h1>
            <p className="text-sm text-muted-foreground mt-1">HUB International</p>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h2 className="font-semibold text-base">
                  {isSignUp ? 'Create account' : 'Sign in'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isSignUp
                    ? 'Enter your work email and choose a password.'
                    : 'Enter your email and password to access the program.'}
                </p>
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="you@hubinternational.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
                {message && <p className="text-xs text-green-600">{message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </Button>

              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
