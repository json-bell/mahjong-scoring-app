import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import styles from "./Menu.module.scss";

type MenuProps = { onLinkClick?: () => void };

const Menu: React.FC<MenuProps> = ({ onLinkClick }) => {
  const menuStructure: {
    sectionName: string;
    links: {
      label: string;
      url: string;
      target?: React.HTMLAttributeAnchorTarget;
    }[];
  }[] = [
    {
      sectionName: "Scoring",
      links: [
        { label: "Hand Scorer", url: "/score/" },
        { label: "Scoring Rules", url: "/score/rules/" },
      ],
    },
    {
      sectionName: "Game",
      links: [
        { label: "🚧 Create a Game 👷‍♂️", url: "/game/create/" },
        { label: "🏗️ Join a Game 🚧", url: "/game/join/" },
      ],
    },
    {
      sectionName: "Project",
      links: [
        {
          label: "Front-End GitHub",
          url: "https://github.com/json-bell/mahjong-scoring-app",
          target: "_blank",
        },
        {
          label: "Back-End Github",
          url: "https://github.com/json-bell/mahjong-api",
          target: "_blank",
        },
      ],
    },
  ];

  return (
    <nav className={styles.nav}>
      <h2>Menu</h2>
      <Link to={"/"} onClick={onLinkClick}>
        Home
      </Link>
      {menuStructure.map(({ links, sectionName }) => {
        return (
          <Fragment key={sectionName}>
            <h3>{sectionName}</h3>
            {links.map(({ label, url, target }) => (
              <Link key={url} to={url} target={target} onClick={onLinkClick}>
                {label}
              </Link>
            ))}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default Menu;
