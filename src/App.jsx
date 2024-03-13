import { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

import firebaseConfig from "./Configuration/FireBaseConf";

function App() {
  const [Text, setText] = useState("");
  const [Todos, setTodos] = useState([]);
  const [Edit, setEdit] = useState();
  //calling data basee
  const db = getDatabase();

  // submitting data
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

  // reciving existing data or todo
  useEffect(() => {
    const starCountRef = ref(db, "alltodo");
    onValue(starCountRef, snapshot => {
      let todoArr = [];
      snapshot.forEach(item => {
        const data = item.val();
        const id = item.key;
        const todoItem = {
          data: data,
          id: id,
        };
        // pushing every todo and todo id to the todoArr
        todoArr.push(todoItem);
      });
      // finally pushing data to todos
      setTodos(todoArr);
    });
  }, []);

  // getting update todo data and update id
  const handleEditInfo = (updateId, data) => {
    console.log(updateId);
    if (updateId && data) {
      setEdit(updateId);
      setText(data);
    }
  };

  // updating existing todo
  const HandleEdit = () => {
    const Mytodo = {
      Mytodo: Text,
    };
    console.log(Edit);
    update(ref(db, "alltodo/" + Edit), Mytodo).then(() => {
      console.log("updated data");
      setText("");
      setEdit("");
    });
  };

  // deleting existing todo
  const handleDelete = deleteId => {
    remove(ref(db, "alltodo/" + deleteId)).then(
      console.log("sucessfully deleted")
    );
  };

  return (
    <>
      <input type="text" onChange={e => setText(e.target.value)} value={Text} />
      {Edit ? (
        <button onClick={HandleEdit}> edit Data</button>
      ) : (
        <button onClick={handleSubmit}> submit Data</button>
      )}
      {Todos.map((todo, index) => (
        <div key={index}>
          {" "}
          <p> {todo.data.Mytodo} </p>
          <button onClick={() => handleDelete(todo.id)}> delete todo</button>
          <button onClick={() => handleEditInfo(todo.id, todo.data.Mytodo)}>
            {" "}
            edit todo
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
