import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, ChefHat, Clock, DollarSign } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bidorai-neutral-50 via-white to-bidorai-blue-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-bidorai-blue-600 to-bidorai-navy-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-bidorai-blue-600/90 to-bidorai-navy-900/90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-white group">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
              🍽️
            </div>
            <span className="text-3xl font-extrabold tracking-tight">Bidorai</span>
          </Link>
          
          {/* Hero Content */}
          <div className="mt-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Welcome Back to the
              <span className="block text-orange-300">Food Bidding Revolution</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-md">
              Join thousands of food lovers getting premium catering at unbeatable prices through our innovative bidding platform.
            </p>
            
            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span>Save 10-25% on premium catering</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span>Access to Dallas's finest restaurants</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Live bidding every hour</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-300">10K+</div>
            <div className="text-white/70 text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-300">50+</div>
            <div className="text-white/70 text-sm">Restaurant Partners</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-300">$2M+</div>
            <div className="text-white/70 text-sm">Savings Generated</div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-bidorai-blue-600 to-bidorai-blue-700 rounded-lg flex items-center justify-center text-xl">
                🍽️
              </div>
              <span className="text-2xl font-extrabold text-bidorai-navy-900">Bidorai</span>
            </Link>
          </div>
          
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-bidorai-neutral-600 hover:text-bidorai-blue-600 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-bidorai-navy-900 mb-2">
              Sign in to your account
            </h2>
            <p className="text-bidorai-neutral-600">
              Continue bidding on premium catering deals
            </p>
          </div>
          
          {/* Clerk Sign In Component with Custom Styling */}
          <div className="clerk-form-container">
            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-2xl border border-bidorai-neutral-200 rounded-2xl bg-white",
                  headerTitle: "text-2xl font-bold text-bidorai-navy-900",
                  headerSubtitle: "text-bidorai-neutral-600",
                  socialButtonsBlockButton: "border border-bidorai-neutral-300 hover:bg-bidorai-neutral-50 transition-colors rounded-lg h-12 font-medium",
                  socialButtonsProviderIcon: "w-5 h-5",
                  dividerLine: "bg-bidorai-neutral-200",
                  dividerText: "text-bidorai-neutral-500 text-sm",
                  formFieldInput: "border border-bidorai-neutral-300 focus:border-bidorai-blue-600 focus:ring-2 focus:ring-bidorai-blue-600/20 rounded-lg h-12 px-4",
                  formFieldLabel: "text-bidorai-navy-900 font-medium",
                  formButtonPrimary: "bg-bidorai-blue-600 hover:bg-bidorai-blue-700 text-white font-semibold rounded-lg h-12 shadow-lg hover:shadow-xl transition-all duration-200",
                  formFieldInputShowPasswordButton: "text-bidorai-neutral-500 hover:text-bidorai-neutral-700",
                  footerActionLink: "text-bidorai-blue-600 hover:text-bidorai-blue-700 font-semibold",
                  identityPreviewText: "text-bidorai-neutral-600",
                  identityPreviewEditButton: "text-bidorai-blue-600 hover:text-bidorai-blue-700",
                }
              }}
              redirectUrl="/dashboard"
              signUpUrl="/sign-up"
            />
          </div>
          
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-bidorai-neutral-600">
              Don't have an account?{' '}
              <Link 
                href="/sign-up" 
                className="text-bidorai-blue-600 hover:text-bidorai-blue-700 font-semibold transition-colors"
              >
                Sign up and start saving
              </Link>
            </p>
          </div>
          
          {/* Benefits Reminder */}
          <div className="mt-8 p-4 bg-bidorai-blue-50 rounded-lg border border-bidorai-blue-200">
            <div className="text-center">
              <div className="text-sm font-medium text-bidorai-blue-900 mb-1">
                🎯 Next auction starts in 45 minutes
              </div>
              <div className="text-xs text-bidorai-blue-700">
                Premium sushi platters starting at $89
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}