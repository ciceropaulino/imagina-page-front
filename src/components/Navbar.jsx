import { Link } from 'react-router-dom'
import basic_cube_logo from "../assets/images/basic_cube_logo.svg";
import { UserCircle } from "phosphor-react";


const navLists = [
  { name: "Works", path: "/*"},
  { name: "People", path: "/people"},
  { name: "About", path: "/*"},
  { name: "Blog", path: "/*"},
  { name: "Contact", path: "/contact"},
];

const Navbar = () => {
  return (
    <header className="w-full py-2 sm:px-10 px-5 flex justify-between bg-black
      items-center bg-opacity-50 backdrop-blur-sm">
      <nav className="flex w-full screen-max-width items-center">
        <div className="flex flex-1 justify-center items-center max-sm:hidden">
          <Link to="/*">
            <img src={basic_cube_logo} alt="Imagina Logo" width={14} height={18} />
          </Link>
          {navLists.map((nav) => (
            <Link 
              key={nav.name}
              to={nav.path}
              className="px-5 text-xs cursor-pointer text-white/70 hover:text-white transition-all"
            >
              {nav.name}
            </Link>
          ))}
          <Link to="/login">
            <UserCircle/>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
