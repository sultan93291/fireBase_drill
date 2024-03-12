import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import firebaseConfig from "./Configuration/FireBaseConf";

function App() {
  const [Text, setText] = useState("");
  const [Todos, setTodos] = useState([]);

  const db = getDatabase();
  const handleSubmit = () => {
    if (Text !== "") {
      set(push(ref(db, "alltodo")), {
        Mytodo: Text,
      });
      setText("");
      console.log("todo creating ");
    } else {
      console.log("empty space");
    }
  };

  useEffect(() => {
    const starCountRef = ref(db, "alltodo");
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      console.log(data);

      const TodoArr = data ? Object.values(data) : [];
      setTodos(TodoArr);
    });
  }, []);

  return (
    <>
      <input type="text" onChange={e => setText(e.target.value)} value={Text} />
      <button onClick={handleSubmit}>Submit Data</button>
      {Todos.map((todo, index) => (
        <p key={index}> {todo.Mytodo} </p>
      ))}
    </>
  );
}

export default App;
