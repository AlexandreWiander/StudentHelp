export default function Home() {
  const [syntesis, setSynth] = useState();

  useEffect(() => {
    //tu fais un fetch depuis l'api Next dans getSynths
    //tu recupère la liste des sythese et fait setSynth(laListe)
  }, [synthesis]);

  return (
    <div>
      /**Pour chaque synthèse tu affiche un composant SynthListElement */
    </div>
  );
}
