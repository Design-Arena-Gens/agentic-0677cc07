import GreetingDesigner from "@/components/GreetingDesigner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.hero}>
          <p className={styles.tag}>Say hi</p>
          <h1>Create a hello that brightens someone’s day.</h1>
          <p>
            Spin up a personal greeting, tweak the tone, add a note, and share it forward. A
            thoughtful “hi” is the easiest way to start something wonderful.
          </p>
        </header>

        <GreetingDesigner />

        <footer className={styles.footer}>
          <p>
            Pro tip: bookmark this page for the next time you want to send a quick, heartfelt hello.
          </p>
        </footer>
      </main>
    </div>
  );
}
