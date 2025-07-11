"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { login, loginWithPhone, signup, sendOTP } = useAuth();

  // Email/Password form state
  const [emailForm, setEmailForm] = useState({
    email: '',
    password: '',
  });

  // Phone OTP form state
  const [phoneForm, setPhoneForm] = useState({
    phone: '',
    otp: '',
    isOtpSent: false,
  });

  // Sign up form state
  const [signupForm, setSignupForm] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    restaurantName: '',
    ownerName: '',
    address: '',
    cuisine: '',
  });

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const success = await login(emailForm.email, emailForm.password);
      if (success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!phoneForm.isOtpSent) {
        const otpSent = await sendOTP(phoneForm.phone);
        if (otpSent) {
          setPhoneForm(prev => ({ ...prev, isOtpSent: true }));
          setSuccess('OTP sent to your phone!');
        } else {
          setError('Failed to send OTP. Please try again.');
        }
      } else {
        const success = await loginWithPhone(phoneForm.phone, phoneForm.otp);
        if (success) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => router.push('/dashboard'), 1000);
        } else {
          setError('Invalid OTP');
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup({
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password,
        restaurantName: signupForm.restaurantName,
        ownerName: signupForm.ownerName,
        address: signupForm.address,
        cuisine: signupForm.cuisine,
      });

      if (success) {
        setSuccess('Account created successfully! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img src="/logo.png" alt="Bidovio" className="w-12 h-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create Restaurant Account' : 'Sign in to Restaurant Portal'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? 'Join Bidovio as a restaurant partner' : 'Manage your restaurant on Bidovio'}
          </p>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsPhoneAuth(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              !isPhoneAuth ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => setIsPhoneAuth(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isPhoneAuth ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Phone
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        {/* Email/Password Authentication */}
        {!isPhoneAuth && !isSignUp && (
          <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  value={emailForm.password}
                  onChange={(e) => setEmailForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        )}

        {/* Phone OTP Authentication */}
        {isPhoneAuth && !isSignUp && (
          <form className="mt-8 space-y-6" onSubmit={handlePhoneLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={phoneForm.phone}
                  onChange={(e) => setPhoneForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              {phoneForm.isOtpSent && (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP Code
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Enter OTP code"
                    value={phoneForm.otp}
                    onChange={(e) => setPhoneForm(prev => ({ ...prev, otp: e.target.value }))}
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? (phoneForm.isOtpSent ? 'Verifying...' : 'Sending OTP...') : (phoneForm.isOtpSent ? 'Verify OTP' : 'Send OTP')}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Form */}
        {isSignUp && (
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                  Restaurant Name
                </label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter restaurant name"
                  value={signupForm.restaurantName}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, restaurantName: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                  Owner Name
                </label>
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter owner name"
                  value={signupForm.ownerName}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, ownerName: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Restaurant Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter restaurant address"
                  value={signupForm.address}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                  Cuisine Type
                </label>
                <select
                  id="cuisine"
                  name="cuisine"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  value={signupForm.cuisine}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, cuisine: e.target.value }))}
                >
                  <option value="">Select cuisine type</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="chinese">Chinese</option>
                  <option value="indian">Indian</option>
                  <option value="american">American</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="asian">Asian</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Create a password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
