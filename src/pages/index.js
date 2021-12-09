import React from "react";
import Meta from "components/Meta";
import styles from 'styles/Home.module.css';
import { useAuth } from "util/auth";

function IndexPage(props) {
  const auth = useAuth();
  var currentUser = auth.user;
  console.log(currentUser);
  return (
    <>
      <Meta />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to ClownTown 🤡!
        </h1>

        <div className={styles.grid}>

          <a href="/auth/signin" className={styles.card}>
            <h2>👊 Join Now </h2>
            <p>
             Create your account and meet fellow clowns!
            </p>
          </a>

          <a href="/showclownsonas/" className={styles.card}>
            <h2>😣 Clownsonas</h2>
            <p>Create your very own downloadable Clown avatar</p>
          </a>

          <a href={currentUser ? 
            "https://play.clowntown.me/playingAs?user=" + currentUser.id 
            : "https://play.clowntown.me/"} className={styles.card}>
            <h2>🧵 Tug of War</h2>
            <p>Pull a rope from a frenemy and earn tokens!</p>
          </a>

          <a href={currentUser ? 
            "https://play.clowntown.me/playingAs?user=" + currentUser.id +"&chat=true"
            : "https://play.clowntown.me/chat"} className={styles.card}>
            <h2>💬 Clown Void Chat</h2>
            <p>Scream into the void with your fellow clowns!</p>
          </a>
        </div>
      </main>
    </>
  );
}

export default IndexPage;
