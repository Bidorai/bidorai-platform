import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Trophy, Users, Zap, Percent, Heart, Clock } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bidorai-neutral-50 via-white to-orange-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 to-orange-600/90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        
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
              Join the Future of
              <span className="block text-yellow-200">Party Catering</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-md">
              Be part of a community that's revolutionizing how we get premium food for events. Your taste buds (and wallet) will thank you.
            </p>
            
            {/* Why Join Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Percent className="w-4 h-4" />
                </div>
                <span>Save up to 25% on every order</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <span>Access exclusive restaurant partnerships</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Real-time bidding notifications</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <span>Support local Dallas restaurants</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm">👨</div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-sm">👩</div>
                <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-sm">👨</div>
                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-sm">👩</div>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Join 10,000+ members</div>
                <div className="text-white/70 text-xs">Who saved $2M+ last year</div>
              </div>
            </div>
            <div className="text-white/90 text-sm italic">
              "Just saved $180 on our company lunch. This app is a game-changer!"
            </div>
            <div className="text-white/70 text-xs mt-1">- Sarah, Marketing Manager</div>
          </div>
          
          {/* Live Activity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">Live Activity</span>
            </div>
            <div className="text-white/90 text-xs">
              <Clock className="w-3 h-3 inline mr-1" />
              5 people just joined • 12 active auctions
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-xl">
                🍽️
              </div>
              <span className="text-2xl font-extrabold text-bidorai-navy-900">Bidorai</span>
            </Link>
          </div>
          
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-bidorai-neutral-600 hover:text-orange-600 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </Link>
          
          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-bidorai-navy-900 mb-2">
              Create your account
            </h2>
            <p className="text-bidorai-neutral-600">
              Start saving on premium catering today
            </p>
          </div>
          
          {/* Clerk Sign Up Component with Custom Styling */}
          <div className="clerk-form-container">
            <SignUp 
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
                  formFieldInput: "border border-bidorai-neutral-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-lg h-12 px-4",
                  formFieldLabel: "text-bidorai-navy-900 font-medium",
                  formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg h-12 shadow-lg hover:shadow-xl transition-all duration-200",
                  formFieldInputShowPasswordButton: "text-bidorai-neutral-500 hover:text-bidorai-neutral-700",
                  footerActionLink: "text-orange-600 hover:text-orange-700 font-semibold",
                  identityPreviewText: "text-bidorai-neutral-600",
                  identityPreviewEditButton: "text-orange-600 hover:text-orange-700",
                  formFieldSuccessText: "text-green-600",
                  formFieldErrorText: "text-red-600",
                  alertText: "text-bidorai-neutral-700",
                }
              }}
              redirectUrl="/dashboard"
              signInUrl="/sign-in"
            />
          </div>
          
          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-bidorai-neutral-600">
              Already have an account?{' '}
              <Link 
                href="/sign-in" 
                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                Sign in to continue bidding
              </Link>
            </p>
          </div>
          
          {/* Welcome Offer */}
          <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
            <div className="text-center">
              <div className="text-sm font-bold text-orange-800 mb-1">
                🎉 Welcome Offer: $25 Bidding Credit
              </div>
              <div className="text-xs text-orange-700">
                Use on your first order • Valid for 30 days
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-bidorai-neutral-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Free to join</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}