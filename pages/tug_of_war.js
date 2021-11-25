import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import useAuth from "../utils/auth";
import Script from 'next/script'

import { Component } from 'react'
import io from 'socket.io-client'

class Medium extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hello: ''
    }
  }
  componentDidMount() {
    this.socket = io()
    console.log("mounted")
    this.socket.on('now', data=> {
      this.setState({
        hello: data.message
      })
    })
    console.log(this)
  }

  dobutton() {
    console.log("we did it bois")
    console.log(this.socket.doThing())
  }

  render() {
    return (
      <div>
        <button id="form" onClick={this.dobutton}>This is a test</button>
      </div>
    )
  }
}

export default Medium
// export default function Home() {
//   const auth = useAuth();
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>ClownTown</title>
//         <meta name="description" content="Carnival game app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to ClownTown 🤡!
//         </h1>

//           <p className={styles.description}>
//             {!auth.user ? <span> Get started by <a href="/login"> logging in </a> </span> : <span> What's up {auth.user?.displayName}? <a href="/logout"> Log Out? </a> </span> }
//           </p>
//           <p>{auth.user?.email}</p>
//       </main>

//       <footer className={styles.footer}>
//           Made by: ____.
//       </footer>
//     </div>
//   )
// }
