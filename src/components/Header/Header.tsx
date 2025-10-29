import { useState } from "react";
import ApiStatusPill from "../ApiStatus/ApiStatusPill/ApiStatusPill";
import styles from "./Header.module.scss";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

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
        <h1>
          <Link to={"/"}>MAHJONG</Link>
        </h1>
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
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: "24px 25%",
              alignItems: "center",
            }}
          >
            <h2>Navigation</h2>
            <h3>Scoring</h3>
            <Link to={"/score/rules"} onClick={onLinkClick}>
              Scoring Rules
            </Link>
            <h3>Works in progress</h3>
            {[
              "/",
              "/score",
              "/score/rules",
              "/game/create",
              "/game/join",
              "/game/3",
            ].map((url) => (
              <Link to={url} onClick={onLinkClick} key={url}>
                {url}
              </Link>
            ))}
          </nav>
        </Modal>
      </header>
    </>
  );
};

export default Header;
