import styles from "./styles.module.scss";
const ORGWizardLayout = ({ children, title, subtitle }) => {
  return (
    <main className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/images/govlogo.png" alt="logo" />
        </div>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </aside>
      <section className={styles.content}>
        <div className={styles.logo}>
          <img src="/images/dsc-logo.svg" alt="logo" />
        </div>
        <div className={styles.contentHeader}>{children}</div>
      </section>
    </main>
  );
};

export default ORGWizardLayout;
