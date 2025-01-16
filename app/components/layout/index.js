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


// import styles from "./styles.module.scss";
// const ORGWizardLayout = ({ children, title, subtitle }) => {
//   return (
//     <main className={styles.layout}>
//       <aside className={styles.sidebar}>
//         <div className={styles.logo}>
//           <img src="/images/govlogo.png" alt="logo" />
//         </div>
//         <div>
//           <h1>{title}</h1>
//           <p>{subtitle}</p>
//         </div>
//       </aside>
//       <section className={styles.content}>
//         <div className={styles.logo}>
//           <img src="/images/dsc-logo.svg" alt="logo" />
//         </div>
//         <div className={styles.contentHeader}>{children}</div>
//       </section>
//     </main>
//   );
// };

// export default ORGWizardLayout;

