import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  const { sendMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    const { error } = await sendMagicLink(email.trim());
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
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
            {sent ? (
              <div className="flex flex-col items-center gap-3 text-center py-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <h2 className="font-semibold text-base">Check your inbox</h2>
                <p className="text-sm text-muted-foreground">
                  We sent a sign-in link to <strong>{email}</strong>. Click it to access the program.
                </p>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground"
                  onClick={() => { setSent(false); setEmail(''); }}>
                  Use a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h2 className="font-semibold text-base">Sign in</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your work email and we'll send you a sign-in link.
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
                  {error && <p className="text-xs text-destructive">{error}</p>}
                </div>
                <Button type="submit" className="w-full flex items-center gap-2" disabled={loading}>
                  <Mail className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send sign-in link'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
