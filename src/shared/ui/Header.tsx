import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  let navButton = null;

  if (pathname === "/") {
    navButton = (
      <Link
        to="/sort"
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-primary transition-colors hover:bg-primary/10 md:px-5 md:py-3"
      >
        <span className="hidden md:inline">전체 상품 </span>
        <span>정렬해서 보기</span>
      </Link>
    );
  } else if (pathname === "/sort" || pathname.startsWith("/product/")) {
    navButton = (
      <Link
        to="/"
        className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-primary transition-colors hover:bg-primary/10 md:px-5 md:py-3"
      >
        홈으로
      </Link>
    );
  }

  if (!navButton) {
    return null;
  }

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

        <nav className="flex items-center">{navButton}</nav>
      </div>
    </header>
  );
};

export default Header;
