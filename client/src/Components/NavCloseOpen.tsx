import React from "react";
import styled from "styled-components";
interface Props {
  setNavIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  navIsActive: boolean;
}
function NavCloseOpen({ setNavIsActive, navIsActive }: Props) {
  const handleClick = () => {
    setNavIsActive(!navIsActive);
  };
  return (
    <Button
      onClick={handleClick}
      style={navIsActive ? { transform: "rotate(-90deg)" } : {}}>
      <i className="fa-solid fa-bars"></i>
    </Button>
  );
}

export default NavCloseOpen;

const Button = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  border: none;
  height: 30px;
  width: 30px;
  cursor: pointer;
  background: none;
  text-transform: uppercase;
  color: #34495e;
  font-size: 20px;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
`;
