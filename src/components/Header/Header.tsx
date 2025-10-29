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
            <h2>Menu</h2>
            <h3>Scoring</h3>
            <Link to={"/score/rules"} onClick={onLinkClick}>
              Scoring Rules
            </Link>
            <h3>Github</h3>
            <Link
              to="https://github.com/json-bell/mahjong-scoring-app"
              target="_blank"
            >
              Front-End Repo
            </Link>
            <Link to="https://github.com/json-bell/mahjong-api" target="_blank">
              API Repo
            </Link>
            <h3>Works in progress</h3>
            {["/", "/score", "/game/create", "/game/join", "/game/3"].map(
              (url) => (
                <Link to={url} onClick={onLinkClick} key={url}>
                  {url}
                </Link>
              )
            )}
          </nav>
        </Modal>
      </header>
    </>
  );
};

export default Header;
