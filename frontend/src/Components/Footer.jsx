import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronRight } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { SITE, SOCIAL, FOOTER, CONTACT } from '../config/site'

const Footer = () => {
  const content = useContent();
  const year = new Date().getFullYear();

  const quickLinks = [
    ...(FOOTER.quickLinks?.links || []),
    { to: "/course", label: "Courses" },
    { to: "/mock", label: "Mock Test" },
    { to: "/notice", label: "Notice" },
  ];

  return (
    <footer className="relative bg-[#04122b] overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]" />
      </div>

      {/* Top accent line */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column — wider */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <span className="text-xl font-bold text-white mb-4 block">{SITE.name}</span>
              <p className="text-sm leading-7 text-white/55 max-w-xs">
                {content.footer_aboutText || FOOTER.aboutText}
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary/80 mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-secondary/40 focus:bg-white/[0.09] transition-all"
                />
                <button className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary-light text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2.5 pt-1">
              {[
                { href: content.social_facebook || SOCIAL.facebook, icon: <FaFacebook size={16} />, label: "Facebook" },
                { href: content.social_instagram || SOCIAL.instagram, icon: <FaInstagram size={16} />, label: "Instagram" },
                { href: content.social_tiktok || SOCIAL.tiktok, icon: <FaTiktok size={16} />, label: "TikTok" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-secondary/25 hover:border-secondary/30 hover:scale-110 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-6 lg:pl-8 lg:border-l border-white/[0.06]">

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-secondary/80 mb-5">Quick Links</h3>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <NavLink
                      to={link.to}
                      className="group flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors duration-200"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-secondary" />
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-secondary/80 mb-5">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-secondary/80" />
                  </span>
                  <span className="text-sm text-white/55 leading-relaxed">Maitighar, Kathmandu, Nepal</span>
                </li>
                <li>
                  <a href="tel:+977015360880" className="flex items-center gap-3 group">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-secondary/80" />
                    </span>
                    <span className="text-sm text-white/55 group-hover:text-white transition-colors">+977 01-5360880</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+9779851198288" className="flex items-center gap-3 group">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-secondary/80" />
                    </span>
                    <span className="text-sm text-white/55 group-hover:text-white transition-colors">+977 9851198288</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@institute.edu.np" className="flex items-center gap-3 group">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                      <Mail className="w-3.5 h-3.5 text-secondary/80" />
                    </span>
                    <span className="text-sm text-white/55 group-hover:text-white transition-colors">info@institute.edu.np</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-secondary/80" />
                  </span>
                  <span className="text-sm text-white/40">Sun–Fri: 9AM – 5PM</span>
                </li>
              </ul>
            </div>

            {/* Map embed placeholder / reach us */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-secondary/80 mb-5">Find Us</h3>
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] aspect-[4/3]">
                <iframe
                  title="Our Location"
                  src={CONTACT.info.map.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            &copy; {year} {content.site_name || SITE.name}. {content.footer_rights || FOOTER.rights}
          </p>
          <p className="text-xs text-white/30">
            Designed &amp; developed by{' '}
            <a
              href={SOCIAL.developerCredit?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-secondary transition-colors underline underline-offset-2 decoration-white/20"
            >
              {SOCIAL.developerCredit?.text}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
