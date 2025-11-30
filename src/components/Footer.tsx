export function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo */}
          <div>
            <div className="text-[#FF8C00] mb-4">GIKIBITES</div>
          </div>
          
          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-white">COMPANY</h3>
            <ul className="space-y-2 text-[#CCCCCC]">
              <li><a href="#home" className="hover:text-[#FF8C00] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#FF8C00] transition-colors">About us</a></li>
              <li><a href="#delivery" className="hover:text-[#FF8C00] transition-colors">Delivery</a></li>
              <li><a href="#privacy" className="hover:text-[#FF8C00] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-white">GET IN TOUCH</h3>
            <ul className="space-y-2 text-[#CCCCCC]">
              <li>+92-305-9013378</li>
              <li>contact@giki.edu.pk</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
