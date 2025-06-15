'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Eye, EyeOff, Mail, Lock, User, Loader2, Chrome } from 'lucide-react';
import { useSignIn, useSignUp } from '@clerk/nextjs';

interface CustomAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onModeSwitch: (mode: 'signin' | 'signup') => void;
}

const CustomAuthModal: React.FC<CustomAuthModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onModeSwitch 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { signIn, setActive } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn?.create({
        identifier: signInData.email,
        password: signInData.password,
      });

      if (result?.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        onClose();
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signUp?.create({
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        emailAddress: signUpData.email,
        password: signUpData.password,
      });

      if (result?.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
        onClose();
      } else if (result?.status === 'missing_requirements') {
        setError('Please check your email for verification.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (strategy: 'oauth_google' | 'oauth_facebook') => {
    try {
      setIsLoading(true);
      // Use window.location for social auth to avoid routing issues
      const baseUrl = window.location.origin;
      const redirectUrl = `${baseUrl}/api/auth/callback`;
      
      await signIn?.authenticateWithRedirect({
        strategy,
        redirectUrl,
        redirectUrlComplete: baseUrl
      });
    } catch (err) {
      setError('Social sign in failed. Please try again.');
      setIsLoading(false);
    }
  };

  const ModalBackdrop = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );

  const SignInContent = () => (
    <div>
      {/* Header */}
      <div className="relative p-8 pb-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-blue-600/30 animate-pulse">
            🍽️
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Hungry for Great Deals?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Sign in to continue your food bidding adventure and discover amazing catering at unbeatable prices!</p>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="px-8 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialSignIn('oauth_google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group disabled:opacity-50"
          >
            <Chrome className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Google</span>
          </button>
          <button
            onClick={() => handleSocialSignIn('oauth_facebook')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group disabled:opacity-50"
          >
            <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold group-hover:bg-blue-700">f</div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Facebook</span>
          </button>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
          </div>
        </div>
      </div>

      {/* Sign In Form */}
      <div className="px-8 pb-8">
        <form onSubmit={handleSignIn} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={signInData.email}
                onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="chef@bidorai.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={signInData.password}
                onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Your secret recipe"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Getting your kitchen ready...
              </>
            ) : (
              <>
                <span>🔥</span>
                Start Bidding on Food!
              </>
            )}
          </button>
        </form>
        
        {/* Switch to Sign Up */}
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl text-center border-2 border-orange-100">
          <div className="text-3xl mb-3">🎉</div>
          <p className="text-gray-700 mb-3 font-medium">
            New to the BIDORAI kitchen?
          </p>
          <button 
            onClick={() => onModeSwitch('signup')}
            className="text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline transition-colors"
            disabled={isLoading}
          >
            Join the feast and start saving! →
          </button>
        </div>

        {/* Features Preview */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-xs text-gray-600 font-semibold">Smart Bidding</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-xs text-gray-600 font-semibold">Save 10-25%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-2">🍽️</div>
            <div className="text-xs text-gray-600 font-semibold">Premium Food</div>
          </div>
        </div>
      </div>
    </div>
  );

  const SignUpContent = () => (
    <div>
      {/* Header */}
      <div className="relative p-8 pb-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-orange-500/30 animate-pulse">
            🎉
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Join the Food Revolution!</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Start your culinary adventure with smart bidding on premium catering and save big on every meal!</p>
        </div>
      </div>

      {/* Benefits Banner */}
      <div className="mx-8 mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
        <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-base mb-3">
          <CheckCircle className="w-5 h-5" />
          <span>🎁 New Chef Benefits</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-green-700 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-lg">💵</span>
            <span>$1 Friday Bids</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span>Premium Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔓</span>
            <span>Early Access</span>
          </div>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="px-8 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialSignIn('oauth_google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group disabled:opacity-50"
          >
            <Chrome className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Google</span>
          </button>
          <button
            onClick={() => handleSocialSignIn('oauth_facebook')}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group disabled:opacity-50"
          >
            <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold group-hover:bg-blue-700">f</div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Facebook</span>
          </button>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or create your chef profile</span>
          </div>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="px-8 pb-8">
        <form onSubmit={handleSignUp} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-3">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={signUpData.firstName}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                  placeholder="Chef"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-3">
                Last Name
              </label>
              <input
                type="text"
                value={signUpData.lastName}
                onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Bidder"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={signUpData.email}
                onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="chef@bidorai.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={signUpData.password}
                onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Create your secret recipe"
                required
                minLength={8}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Minimum 8 characters for kitchen security</p>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Setting up your kitchen...
              </>
            ) : (
              <>
                <span>🚀</span>
                Join the Feast Revolution!
              </>
            )}
          </button>
        </form>
        
        {/* Switch to Sign In */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl text-center border-2 border-blue-100">
          <div className="text-3xl mb-3">👋</div>
          <p className="text-gray-700 mb-3 font-medium">
            Already cooking with BIDORAI?
          </p>
          <button 
            onClick={() => onModeSwitch('signin')}
            className="text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline transition-colors"
            disabled={isLoading}
          >
            Welcome back to the kitchen! →
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-medium">10,000+ Happy Bidders</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalBackdrop>
      {mode === 'signin' ? <SignInContent /> : <SignUpContent />}
    </ModalBackdrop>
  );
};

export default CustomAuthModal;

  const ModalBackdrop = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );

  const SignInContent = () => (
    <div>
      {/* Header */}
      <div className="relative p-8 pb-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-blue-600/30 animate-pulse">
            🍽️
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Hungry for Great Deals?</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Sign in to continue your food bidding adventure and discover amazing catering at unbeatable prices!</p>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="px-8 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialSignIn('oauth_google')}
            className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            <Chrome className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button
            onClick={() => handleSocialSignIn('oauth_facebook')}
            className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold group-hover:bg-blue-700">f</div>
          </button>
          <button
            onClick={() => handleSocialSignIn('oauth_apple')}
            className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            <Apple className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </button>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
          </div>
        </div>
      </div>

      {/* Sign In Form */}
      <div className="px-8 pb-8">
        <form onSubmit={handleSignIn} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={signInData.email}
                onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="chef@bidorai.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={signInData.password}
                onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Your secret recipe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Getting your kitchen ready...
              </>
            ) : (
              <>
                <span>🔥</span>
                Start Bidding on Food!
              </>
            )}
          </button>
        </form>
        
        {/* Switch to Sign Up */}
        <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl text-center border-2 border-orange-100">
          <div className="text-3xl mb-3">🎉</div>
          <p className="text-gray-700 mb-3 font-medium">
            New to the BIDORAI kitchen?
          </p>
          <button 
            onClick={() => onModeSwitch('signup')}
            className="text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline transition-colors"
          >
            Join the feast and start saving! →
          </button>
        </div>

        {/* Features Preview */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-xs text-gray-600 font-semibold">Smart Bidding</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-xs text-gray-600 font-semibold">Save 10-25%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="text-3xl mb-2">🍽️</div>
            <div className="text-xs text-gray-600 font-semibold">Premium Food</div>
          </div>
        </div>
      </div>
    </div>
  );

  const SignUpContent = () => (
    <div>
      {/* Header */}
      <div className="relative p-8 pb-6">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-orange-500/30 animate-pulse">
            🎉
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Join the Food Revolution!</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Start your culinary adventure with smart bidding on premium catering and save big on every meal!</p>
        </div>
      </div>

      {/* Benefits Banner */}
      <div className="mx-8 mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
        <div className="flex items-center justify-center gap-2 text-green-700 font-bold text-base mb-3">
          <CheckCircle className="w-5 h-5" />
          <span>🎁 New Chef Benefits</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-green-700 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-lg">💵</span>
            <span>$1 Friday Bids</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🚚</span>
            <span>Free Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span>Premium Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔓</span>
            <span>Early Access</span>
          </div>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="px-8 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSocialSignIn('oauth_google')}
            className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            <Chrome className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </button>
          <button
            onClick={() => handleSocialSignIn('oauth_facebook')}
            className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold group-hover:bg-blue-700">f</div>
          </button>
          <button
            onClick={() => handleSocialSignIn('oauth_apple')}
            className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            <Apple className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
          </button>
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">or create your chef profile</span>
          </div>
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="px-8 pb-8">
        <form onSubmit={handleSignUp} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-3">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={signUpData.firstName}
                  onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                  placeholder="Chef"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-3">
                Last Name
              </label>
              <input
                type="text"
                value={signUpData.lastName}
                onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Bidder"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={signUpData.email}
                onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="chef@bidorai.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold text-sm mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={signUpData.password}
                onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 focus:border-blue-600 focus:ring-0 rounded-xl text-gray-800 placeholder:text-gray-400 bg-gray-50 focus:bg-white transition-all duration-200 text-lg"
                placeholder="Create your secret recipe"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Minimum 8 characters for kitchen security</p>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Setting up your kitchen...
              </>
            ) : (
              <>
                <span>🚀</span>
                Join the Feast Revolution!
              </>
            )}
          </button>
        </form>
        
        {/* Switch to Sign In */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl text-center border-2 border-blue-100">
          <div className="text-3xl mb-3">👋</div>
          <p className="text-gray-700 mb-3 font-medium">
            Already cooking with BIDORAI?
          </p>
          <button 
            onClick={() => onModeSwitch('signin')}
            className="text-blue-600 hover:text-blue-700 font-bold text-lg hover:underline transition-colors"
          >
            Welcome back to the kitchen! →
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Secure & Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-medium">10,000+ Happy Bidders</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalBackdrop>
      {mode === 'signin' ? <SignInContent /> : <SignUpContent />}
    </ModalBackdrop>
  );
};

export default CustomAuthModal;