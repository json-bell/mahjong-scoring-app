import { useState } from "react";
import ApiStatusPill from "../ApiStatus/ApiStatusPill/ApiStatusPill";
import styles from "./Header.module.scss";
import Modal from "../UI/Modal/Modal";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <header className={styles.header}>
        <button
          className={styles.menuButton}
          onClick={() => {
            setIsMenuOpen((curr) => !curr);
          }}
        >
          Menu
        </button>
        <Modal
          isOpen={isMenuOpen}
          onClose={() => {
            setIsMenuOpen(false);
          }}
          closeButtonContents={"Close Menu"}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: "24px 25%",
              alignItems: "center",
            }}
          >
            <h3>MENU</h3>
          </div>
        </Modal>
        <h1>MAHJONG</h1>

        <div className={styles.apiStatus}>
          <div>API Status:</div>
          <ApiStatusPill />
        </div>
      </header>
    </>
  );
};

export default Header;
