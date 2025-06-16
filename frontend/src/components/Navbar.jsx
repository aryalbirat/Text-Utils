import PropTypes from "prop-types";

function Navbar({ onLogout, isLoggedIn }) {
  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 shadow-lg sticky top-0 z-50">
      <div className="flex justify-center gap-4 md:gap-8 items-center relative">
        <div className="hover:bg-blue-600 hover:scale-105 transition-all duration-200 p-4 rounded-lg text-white font-semibold tracking-wide cursor-pointer">
          TextUtils - Smart Text Management Application
        </div>
        {/* <div className="hover:bg-blue-600 hover:scale-105 transition-all duration-200 p-4 rounded-lg text-white font-semibold tracking-wide cursor-pointer">
          TextBox
        </div> */}
        {/* <div className="hover:bg-blue-600 hover:scale-105 transition-all duration-200 p-4 rounded-lg text-white font-semibold tracking-wide cursor-pointer">
          Contact Us
        </div> */}
        {isLoggedIn && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition-all duration-200"
            onClick={onLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  onLogout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default Navbar;