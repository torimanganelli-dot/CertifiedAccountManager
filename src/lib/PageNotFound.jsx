import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="font-inter font-bold text-4xl">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <Link to="/" className="text-primary hover:underline text-sm">
          Go back home
        </Link>
      </div>
    </div>
  );
}
