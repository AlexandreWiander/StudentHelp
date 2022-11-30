import styles from '../styles/Home.module.css'
import google from '../public/images/google.png'

function ConnectionForm(){
    return (
        <>
        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg w-2/3">
            <div className="grid grid-rows-6 grid-flow-col gap-4">
                <h1 className="font-face-pg text-center text-2xl">Connexion</h1>
                <input className={`${styles["inputConnection"]} rounded-full shadow-md p-2 text-center h-12`} type="text" name="mail" placeholder="Adresse Mail"/>
                <input className={`${styles["inputConnection"]} rounded-full shadow-md p-2 text-center h-12`} type="password" name="password" placeholder="Mot de passe"/>
                <button className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg`} type="submit">Se connecter</button>
                <button className={`${styles["googleButton"]} rounded-full shadow-md p-2 font-face-pg grid grid-cols-8 items-center text-center`}>
                    <div/><div/>
                    <img src={google.src} className="w-9 h-9"></img>
                    <p className='whitespace-nowrap'>Se connecter avec Google</p>
                    <div/><div/>
                </button>
                <div className='text-center'>
                    <p>Vous n'avez pas encore de compte ? <a href='#' className='text-center text-sky-600'> Cliquez ici</a></p>
                </div>
            </div>
        </form>
        </>
    )
}
export default ConnectionForm