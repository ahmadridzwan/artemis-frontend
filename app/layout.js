"use client";
import { AuthProvider } from "./context/AuthContext";
import { UserBlocksProvider } from "./context/UserBlockContext";
import "./global.scss";
import styles from "./styles.module.scss";

const RootLayout = ({ children, title, subtitle }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserBlocksProvider>
            <main className={styles.layout}>
              <aside className={styles.sidebar}>
                <div className={styles.logo}>
                  <img src="/images/logo2.svg" alt="logo" />
                </div>
                <div>
                  <h1>{title}</h1>
                  <p>{subtitle}</p>
                </div>
              </aside>
              <section className={styles.content}>
                <div className={styles.logo}>
                  <img src="/images/logo1.svg" alt="logo" />
                </div>
                <div className={styles.contentHeader}>{children}</div>
              </section>
            </main>
          </UserBlocksProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
