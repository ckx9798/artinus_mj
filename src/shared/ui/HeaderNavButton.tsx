import { Link, useLocation } from "react-router-dom";

const HeaderNavButton = () => {
  const { pathname } = useLocation();

  const commonLinkClass =
    "rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-inset ring-primary transition-colors hover:bg-primary/10 md:px-5 md:py-3";

  if (pathname === "/") {
    return (
      <Link to="/sort" className={commonLinkClass}>
        <span className="hidden md:inline">전체 상품 </span>
        <span>정렬해서 보기</span>
      </Link>
    );
  }

  if (pathname === "/sort" || pathname.startsWith("/product/")) {
    return (
      <Link to="/" className={commonLinkClass}>
        홈으로
      </Link>
    );
  }

  return null;
};

export default HeaderNavButton;
