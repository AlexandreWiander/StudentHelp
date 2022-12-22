import ChatList from "../../components/ChatList";

export default function Home() {
  return (
    <div>
        <h1>Liste des discussions</h1>
        <p>Pour créer une discussion, il faut créer une requête de tutorat !</p>
      <ChatList />
    </div>
  );
}
