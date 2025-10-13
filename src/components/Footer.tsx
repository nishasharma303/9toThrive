import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Company: ["About", "Careers", "Blog", "Press"],
    Product: ["Features", "Pricing", "Security", "Updates"],
    Resources: ["Documentation", "Guides", "API Reference", "Community"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
  };

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <footer id="contact" className="bg-[#011627ff] text-primary-foreground py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">9</span>
              </div>
              <span className="text-2xl font-bold">9toThrive</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-xs">
              Connecting students, recruiters, and placement cells for a brighter future.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-lg">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} 9toThrive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
