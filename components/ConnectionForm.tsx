import styles from '../styles/Home.module.css'

function ConnectionForm(){
    return (
        <>
        <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-lg w-2/3">
            <div className="grid grid-rows-4 grid-flow-col gap-4">
                <h1 className="font-face-pg text-center text-2xl">Connexion</h1>
                <input className={`${styles["inputConnection"]} rounded-full shadow-md p-2 text-center`} type="text" name="mail" placeholder="Adresse Mail"/>
                <input className={`${styles["inputConnection"]} rounded-full shadow-md p-2 text-center`} type="password" name="password" placeholder="Mot de passe"/>
                <input className={`${styles["submitConnection"]} rounded-full shadow-md p-2 font-face-pg`} type="submit" value="Se connecter" />
            </div>
        </form>
        </>
    )
}
export default ConnectionForm