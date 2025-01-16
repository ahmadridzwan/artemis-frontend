"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { UserBlocksContext } from "@/app/context/UserBlockContext";
import AdminBlockManager from "@/app/components/AdminBlockManager";
import styles from "./styles.module.scss";

export default function AdminPage() {
  const { isAdmin, loading: authLoading, logout } = useContext(AuthContext);
  const { loading: blocksLoading } = useContext(UserBlocksContext);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push("/");
    }
  }, [isAdmin, authLoading, router]);

  if (authLoading || blocksLoading) return <p>Loading...</p>;

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Admin Dashboard</h1>
      <p className={styles.adminDescription}>Manage predefined blocks below:</p>

      <AdminBlockManager />

      <button className={styles.logoutButton} onClick={logout}>Logout</button>
    </div>
  );
}
