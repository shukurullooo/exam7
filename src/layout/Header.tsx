import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaFilm,
  FaTicketAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import image from "@/assets/main-logo.svg";
import { useState, useEffect } from "react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-black text-black dark:text-white py-3 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={image} alt="logo" className="h-10" />
            <span className="text-red-600 font-bold text-lg">
              BIL<span className="text-white dark:text-white">TICK</span>
            </span>
          </div>

          {/* Desktop menyu */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/" className="flex items-center gap-1 hover:text-red-500">
              <FaCalendarAlt className="text-red-500" />
              Афиша
            </NavLink>
            <NavLink to="/movies" className="flex items-center gap-1 hover:text-red-500">
              <FaFilm />
              Сеансы
            </NavLink>
            <NavLink to="/biletlar" className="flex items-center gap-1 hover:text-red-500">
              <FaTicketAlt />
              Билеты
            </NavLink>
            <NavLink to="/qidiruv" className="flex items-center gap-1 hover:text-red-500">
              <FaSearch />
              Поиск
            </NavLink>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={handleTheme} className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-medium">
              Войти
            </button>
          </div>

          {/* Hamburger icon for mobile */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMobileMenu(true)}
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* 📱 MOBILE BOTTOM NAV POPUP */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={() => setMobileMenu(false)}>
          <div
            className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900 text-black dark:text-white rounded-t-2xl px-6 pt-4 pb-8 shadow-xl"
            onClick={(e) => e.stopPropagation()} // menyu ichiga bosganda yopilmasin
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Навигация</span>
              <button onClick={() => setMobileMenu(false)} className="text-xl">
                <FaTimes />
              </button>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-4 gap-4 text-center text-xs">
              <NavLink to="/afisha" onClick={() => setMobileMenu(false)} className="flex flex-col items-center hover:text-red-500">
                <FaCalendarAlt className="text-xl" />
                Афиша
              </NavLink>
              <NavLink to="/movies" onClick={() => setMobileMenu(false)} className="flex flex-col items-center hover:text-red-500">
                <FaFilm className="text-xl" />
                Сеансы
              </NavLink>
              <NavLink to="/biletlar" onClick={() => setMobileMenu(false)} className="flex flex-col items-center hover:text-red-500">
                <FaTicketAlt className="text-xl" />
                Билеты
              </NavLink>
              <NavLink to="/qidiruv" onClick={() => setMobileMenu(false)} className="flex flex-col items-center hover:text-red-500">
                <FaSearch className="text-xl" />
                Поиск
              </NavLink>
            </div>

            {/* Bottom buttons */}
            <div className="flex justify-between items-center mt-6">
              <button onClick={handleTheme} className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm">
                Войти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
