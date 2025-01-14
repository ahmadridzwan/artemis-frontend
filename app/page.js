"use client";
import styles from "./styles.module.scss";
import Block from "./components/Block";
export default function Home() {
  const data = [
    {
      title: "Block 1",
      description: "FM Companies",
      type: "groupped",
      icon: "/icons/ico-org.png",
      onClick: () => console.log("Block 1 clicked"),
    },
    {
      title: "Academy",
      type: "groupped",
      icon: "/icons/ico-academy.png",
      onClick: () => console.log("Block 2 clicked"),
    },
    {
      title: "Event Companies",
      description: "Description 3",
      icon: "/icons/ico-event.png",
      type: "groupped",
      onClick: () => console.log("Block 3 clicked"),
    },

    {
      title: "Local Clubs",
      description: "Description 3",
      icon: "/icons/ico-local-club.png",
      type: "single",
      onClick: () => console.log("Block 3 clicked"),
    },

    {
      title: "Community Groups",
      description: "Description 3",
      icon: "/icons/ico-org.png",
      type: "single",
      onClick: () => console.log("Block 3 clicked"),
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        {data.map((block, index) => (
          <Block key={index} {...block} />
        ))}
      </div>
      <button className={styles.btnMain}>Submit</button>
    </main>
  );
}
