import React from "react";
import flower from "../flower.jpg";
import {FaLaptop, FaTabletAlt, FaMobileAlt} from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";

const Header = ({title}) => {
  const {width} = useWindowSize();
  return (
    <header className="Header">
      <h1>{title}</h1>
      <img src={flower} alt="Trulli" width="100" height="100" />
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;
