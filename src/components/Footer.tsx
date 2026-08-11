import React from 'react';
import { Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Send } from 'lucide-react';
import { Logo } from './Logo';
import { PageType } from '../types';
import { COMPANY_DETAILS } from '../data/content';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer 
      className="relative text-white overflow-hidden"
      style={{ 
        /* Reversed gradient: White/light blue starts at bottom-right (100% 100%) and fades to dark blue on the left */
        background: 'radial-gradient(circle at 100% 100%, #E6EFFF 0%, #4F81FF 20%, #0F67FF 50%, #051A59 100%)' 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-4 space-y-6">
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F67FF] rounded-md"
              onClick={() => onNavigate('home')}
              aria-label="Entice HR Solutions — go to homepage"
            >
              <Logo size="md" variant="light" />
            </button>
            <p className="text-sm text-white/90 leading-relaxed max-w-sm drop-shadow-sm">
              Entice HR Solutions acts as your extended HR squad, delivering top-tier recruitment, executive search, and statutory payroll solutions for growing startups and enterprise corporations without in-house HR friction.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href={COMPANY_DETAILS.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Entice HR Solutions on Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0066FF] transition-colors shadow-sm border border-white/10 backdrop-blur-sm"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a 
                href={COMPANY_DETAILS.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Entice HR Solutions on LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0066FF] transition-colors shadow-sm border border-white/10 backdrop-blur-sm"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a 
                href={COMPANY_DETAILS.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Entice HR Solutions on Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0066FF] transition-colors shadow-sm border border-white/10 backdrop-blur-sm"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">Quick Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', route: 'home' }, 
                { label: 'About Us', route: 'about' }, 
                { label: 'Our Services', route: 'services' }, 
                { label: 'HR Insights & Blogs', route: 'blogs' }, 
                { label: 'Contact Us', route: 'contact' }
              ].map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => onNavigate(item.route as PageType)}
                    className="text-sm text-white/80 hover:text-white transition-colors text-left drop-shadow-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Desk */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">Corporate Desk</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 shrink-0 mt-0.5 drop-shadow-sm" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=47/65+Mettu+Street,+Vadiveeswaram,+Nagercoil-629002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 leading-relaxed drop-shadow-sm hover:text-white transition-colors block"
                >
                  47/65 Mettu street, vadiveeswaram,<br />
                  Nagercoil-629002
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/80 shrink-0 drop-shadow-sm" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-sm text-white/80 hover:text-white transition-colors drop-shadow-sm">
                  {COMPANY_DETAILS.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/80 shrink-0 drop-shadow-sm" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-sm text-white/80 hover:text-white transition-colors drop-shadow-sm">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6 relative z-20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">HR Trends Newsletter</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Get monthly B2B hiring playbooks, payroll compliance updates, and startup talent strategies.
            </p>
            <form className="relative flex items-center shadow-lg" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter business email" 
                aria-label="Business email address"
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-md"
              />
              <button 
                type="submit"
                aria-label="Subscribe to HR trends newsletter"
                className="absolute right-2 p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/90 font-medium drop-shadow-md">
            © {new Date().getFullYear()} ENTICE HR SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-medium tracking-wider drop-shadow-sm">
            <span className="uppercase text-white">Nagercoil</span>
            <a href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors uppercase">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors uppercase">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a 
                href={COMPANY_DETAILS.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0066FF] transition-colors shadow-sm border border-white/10 backdrop-blur-sm"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a 
                href={COMPANY_DETAILS.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0066FF] transition-colors shadow-sm border border-white/10 backdrop-blur-sm"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">Quick Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', route: 'home' }, 
                { label: 'About Us', route: 'about' }, 
                { label: 'Our Services', route: 'services' }, 
                { label: 'HR Insights & Blogs', route: 'blogs' }, 
                { label: 'Contact Us', route: 'contact' }
              ].map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => onNavigate(item.route as PageType)}
                    className="text-sm text-white/80 hover:text-white transition-colors text-left drop-shadow-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate Desk */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white drop-shadow-sm">Corporate Desk</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 shrink-0 mt-0.5 drop-shadow-sm" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=47/65+Mettu+Street,+Vadiveeswaram,+Nagercoil-629002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 leading-relaxed drop-shadow-sm hover:text-white transition-colors block"
                >
                  47/65 Mettu street, vadiveeswaram,<br />
                  Nagercoil-629002
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/80 shrink-0 drop-shadow-sm" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-sm text-white/80 hover:text-white transition-colors drop-shadow-sm">
                  {COMPANY_DETAILS.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/80 shrink-0 drop-shadow-sm" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-sm text-white/80 hover:text-white transition-colors drop-shadow-sm">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-6 relative z-20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">HR Trends Newsletter</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Get monthly B2B hiring playbooks, payroll compliance updates, and startup talent strategies.
            </p>
            <form className="relative flex items-center shadow-lg" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter business email" 
                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors backdrop-blur-md"
              />
              <button 
                type="submit"
                className="absolute right-2 p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/90 font-medium drop-shadow-md">
            © {new Date().getFullYear()} ENTICE HR SOLUTIONS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-medium tracking-wider drop-shadow-sm">
            <span className="uppercase text-white">Nagercoil</span>
            <a href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors uppercase">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors uppercase">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
