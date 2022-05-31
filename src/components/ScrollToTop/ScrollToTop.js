import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.matchMedia('(max-width: 991px)').matches) {
      document.getElementById("menu_items").style.width = "0";
    }
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
