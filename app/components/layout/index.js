import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Artemis App</h1>
        <nav>
          {user && <button onClick={logout}>Logout</button>}
          {isAdmin && <button onClick={() => router.push("/admin")}>Admin Dashboard</button>} {/* ✅ Admin-only link */}
        </nav>
      </header>

      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;