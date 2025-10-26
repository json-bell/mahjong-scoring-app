import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={styles.root}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
