import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SignInDialog from "@/components/SignInDialog";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold" style={{ color: '#e25c28ff' }}>9toThrive</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium transition-all duration-300 hover:opacity-80 hover:translate-y-[-2px]"
                style={{ color: '#F1F7ED' }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <SignInDialog
              trigger={
                <Button
                  variant="default"
                  className="transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#e25c28ff', color: '#f1f7edff' }}
                >
                  Sign In
                </Button>
              }
            />
          </div>

          <button
            className="md:hidden"
            style={{ color: '#F1F7ED' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block font-medium py-2 transition-colors duration-300 hover:opacity-80"
                style={{ color: '#F1F7ED' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <SignInDialog
              trigger={
                <Button
                  variant="default"
                  className="w-full"
                  style={{ backgroundColor: '#e25c28ff', color: '#f1f7edff' }}
                >
                  Sign In
                </Button>
              }
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
