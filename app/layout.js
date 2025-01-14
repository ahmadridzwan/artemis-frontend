import "./global.scss";
import styles from "./styles.module.scss";

export const metadata = {
  title: "Artemis Fullstack Developer Task",
};

const RootLayout = ({ children, title, subtitle }) => {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
};

export default RootLayout;
