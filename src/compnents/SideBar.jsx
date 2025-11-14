import { Link, useLocation } from 'react-router-dom';
import {
  FaChurch,
  FaCar,
  FaSpa,
  FaRing,
  FaShoePrints,
  FaTshirt,
  FaGem,
  FaUserShield
} from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/venues", label: "Wedding Venues", icon: <FaChurch /> },
    { path: "/cars", label: "Wedding Cars", icon: <FaCar /> },
    { path: "/flowers", label: "Flower Bouquets", icon: <FaRing /> },
    { path: "/dresses", label: "Dresses", icon: <FaTshirt /> },
    { path: "/salons", label: "Beauty Salons", icon: <FaSpa /> },
    { path: "/groom-suits", label: "Groom Suits", icon: <FaTshirt /> },
    { path: "/shoes", label: "Shoes", icon: <FaShoePrints /> },
    { path: "/accessories", label: "Accessories", icon: <FaGem /> },
    { path: "/admin", label: "User Management", icon: <FaUserShield /> },
  ];

  return (
    <div className="min-h-screen fixed left-0 max-w-72 bg-gradient-to-b from-black via-[#1C1C1C] to-[#2B2B2B] text-white shadow-xl p-5 flex flex-col justify-between">
      <div>
        {/* ✅ مساحة أكبر للشعار بدون التأثير على القائمة */}
        <div className="flex justify-center mb-5">
          <img
            src={logo}
            alt="Royal Moments Logo"
            className="w-56 h-auto object-contain"
          />
        </div>

        <nav className="space-y-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 py-2 px-4 rounded-xl transition-all duration-300
                ${
                  location.pathname === item.path
                    ? 'bg-[#c99329] text-black font-semibold shadow-md'
                    : 'hover:bg-[#c99329] hover:text-black'
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="text-center text-xs text-[#A6A6A6] mt-8">
        © 2025 Royal Moments
      </div>
    </div>
  );
}
