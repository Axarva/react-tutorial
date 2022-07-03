import Button from "./Button.js";
import { useLocation } from "react-router-dom";

const Header = ({ title, toggleAddForm, btnColor, btnText }) => {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          text={btnText}
          color={btnColor}
          onClick={() => toggleAddForm()}
        />
      )}
    </header>
  );
};

export default Header;
