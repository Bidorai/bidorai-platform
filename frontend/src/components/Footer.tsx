export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h4 className="text-blue-400 text-lg font-bold mb-5">BIDORAI</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#careers" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 text-lg font-bold mb-5">For Customers</h4>
            <ul className="space-y-3">
              <li><a href="#how" className="hover:text-blue-400">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-blue-400">Pricing</a></li>
              <li><a href="#support" className="hover:text-blue-400">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 text-lg font-bold mb-5">For Restaurants</h4>
            <ul className="space-y-3">
              <li><a href="#partner" className="hover:text-blue-400">Become a Partner</a></li>
              <li><a href="#portal" className="hover:text-blue-400">Restaurant Portal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-400 text-lg font-bold mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#terms" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-blue-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-5 text-center text-gray-400">
          <p>&copy; 2025 BIDORAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}