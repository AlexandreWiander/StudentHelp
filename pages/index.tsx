import Head from 'next/head'
import ConnectionForm from '../components/ConnectionForm'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import study from '../public/images/study.png'

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
                {/*
                <h1 className='text-4xl m-0 p-0'>Déjà 273 inscrits avec 42 synthèses partagées !</h1>
                <img src={study.src} className='scale-75 m-0 p-0'></img>
                <h2 className='text-2xl m-0 p-0'>StudentHelp est une plateforme d’aide estudiantine.Mise en place d’un système de tutorat, de gestion d’agenda et de partage de synthèse entre étudiants.</h2>
                */}
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
