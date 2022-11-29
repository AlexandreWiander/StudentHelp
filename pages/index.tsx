import Head from 'next/head'
import ConnectionForm from '../components/ConnectionForm'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Head>
          <title>StudentHelp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
          <main className={styles.main}>
            <div className='grid grid-cols-2 w-full '>
              <div className='flex justify-center'>
                <ConnectionForm></ConnectionForm>
              </div>
              <div>
              </div>
            </div>
          </main>
          
        <footer className={styles.footer}>
          <h1>Footer</h1>
          </footer>
      </div>
    </div>
  )
}
