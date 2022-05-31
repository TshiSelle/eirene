import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    {
      if (window.innerWidth < 992) {
        document.getElementById("menu_items").style.width = "0";
      }
    }
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
