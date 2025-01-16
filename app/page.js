"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import UserBlockManager from "./components/UserBlockManager";
import styles from "./styles.module.scss";

export default function Page() {
  const { user, logout, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // ✅ Redirect users without a session to /login
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <h1>Welcome, {user.username}!</h1>
          <p>Select or edit your blocks below:</p>
          <UserBlockManager />
          <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}