import { useState } from "react";
import ApiStatusPill from "../ApiStatus/ApiStatusPill/ApiStatusPill";
import styles from "./Header.module.scss";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onLinkClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => {
            setIsMenuOpen((curr) => !curr);
          }}
        >
          Menu
        </button>

        <Link to={"/"} className={styles.logo}>
          Mahjong
        </Link>

        <div className={styles.apiStatus}>
          <ApiStatusPill />
        </div>

        <Modal
          isOpen={isMenuOpen}
          onClose={() => {
            setIsMenuOpen(false);
          }}
          belowButtons={[
            {
              contents: "Close Menu",
              onClick: () => {
                setIsMenuOpen(false);
              },
              id: "Close",
            },
          ]}
        >
          <Menu onLinkClick={onLinkClick} />
        </Modal>
      </header>
    </>
  );
};

export default Header;
