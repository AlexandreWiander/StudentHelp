import ChatList from "../../components/ChatList";

export default function Home() {
  return (
    <div className="font-face-pg text-center mt-5">
      <h1 className="text-2xl">Liste des discussions</h1>
      <p className="text-md">
        Pour créer une discussion, il faut créer une requête de tutorat !
      </p>
      <ChatList />
    </div>
  );
}
