import HeaderNavButton from "./HeaderNavButton";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="lg:py-4.5 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          to="/"
          className="flex flex-col items-center gap-2 text-2xl font-bold text-primary"
        >
          <img
            src="/logo.svg"
            alt="Artinus Market 로고"
            className="w-16 md:w-24"
          />
          <span className="-mt-2 text-sm text-primary-500 md:text-base">
            Market
          </span>
        </Link>

        <HeaderNavButton />
      </div>
    </header>
  );
};

export default Header;
