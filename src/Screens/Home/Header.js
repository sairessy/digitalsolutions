import React, { useState } from "react";
import Logo from "../../Components/Logo";
import "./Header.css";
import { MdLightMode } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
  Input,
  Row,
} from "reactstrap";

export const Header = ({ changeAuth }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => {
    setPopoverOpen(!popoverOpen);
  };
  return (
    <div className="header">
      <div>
        <MdLightMode size={35} />
      </div>
      <div>
        <Logo />
      </div>
      <div>
        <IoPersonCircleOutline
          cursor="pointer"
          id="popover"
          size={35}
          onClick={() => toggle}
        />
        <div>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="popover"
            toggle={toggle}
          >
            <PopoverHeader></PopoverHeader>
            <PopoverBody>
              <Button onClick={() => changeAuth(false)}>Sair</Button>
              <Button style={{ marginLeft: 10 }}>Perfil</Button>
            </PopoverBody>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
