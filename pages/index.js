import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import useAuth from "../utils/auth";


export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>ClownTown</title>
        <meta name="description" content="Carnival game app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to ClownTown 🤡!
        </h1>

          <p className={styles.description}>
            {!auth.user ? <span> Get started by <a href="/login"> logging in </a> </span> : <span> What's up {auth.user?.displayName}? <a href="/logout"> Log Out? </a> </span> }
          </p>
          <p>{auth.user?.email}</p>

        <div className={styles.grid}>
          <a href="/displayClownsona/" className={styles.card}>
            <h2>😣 Clownsonas</h2>
            <p>Create your very own downloadable Clown avatar</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>🧵 Tug of War</h2>
            <p>Pull a rope from a frenemy and earn tokens!</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>🏪 Store</h2>
            <p>Buy cool stuff with your clown tokens!</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>💭 Chat</h2>
            <p>
             Meet fellow clowns!
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
          Made by: ____.
      </footer>
    </div>
  )
}
