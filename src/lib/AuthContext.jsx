import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        loadProfile(session.user);
      } else {
        setIsLoadingAuth(false);
      }
    });

    // Listen for auth state changes (magic link clicks, logouts, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadProfile(session.user);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsLoadingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (authUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) throw error;

      // Merge auth user fields with profile fields so the rest of the app
      // has everything it expects (email, display_name, role, cohort, etc.)
      setUser({
        id: authUser.id,
        email: authUser.email,
        full_name: profile.display_name || authUser.email,
        display_name: profile.display_name,
        role: profile.role || 'participant',
        cohort: profile.cohort || '',
        hub_location: profile.hub_location || '',
        manager_email: profile.manager_email || '',
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Failed to load profile:', err);
      // Profile row may not exist yet — still mark as authenticated
      // so OnboardingModal can fire and create it
      setUser({
        id: authUser.id,
        email: authUser.email,
        full_name: authUser.email,
        display_name: null,
        role: 'participant',
        cohort: '',
      });
      setIsAuthenticated(true);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // Sends a magic link to the given email
  const sendMagicLink = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  // Called by OnboardingModal after the user sets their display name
  const refreshUser = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) await loadProfile(authUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      logout,
      sendMagicLink,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
