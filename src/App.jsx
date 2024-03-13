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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      toast.success("todo created!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    toast.success("todo updated!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    update(ref(db, "alltodo/" + Edit), Mytodo).then(() => {
      console.log("updated data");
      setText("");
      setEdit("");
    });
  };

  // deleting existing todo
  const handleDelete = deleteId => {
    remove(ref(db, "alltodo/" + deleteId)).then(
      toast.error("todo deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    );
  };

  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="todos">
        <div>
          <h1>firebase todo crud</h1>
          <div className="input__wrapper">
            <input
              type="text"
              onChange={e => setText(e.target.value)}
              value={Text}
            />
            {Edit ? (
              <button onClick={HandleEdit}> edit Data</button>
            ) : (
              <button onClick={handleSubmit}> submit Data</button>
            )}
          </div>
          {Todos.map((todo, index) => (
            <div key={index} id="main">
              {" "}
              <ul id="todo">
                <li> {todo.data.Mytodo} </li>
              </ul>
              <div className="btn__wrapper">
                <button
                  onClick={() => handleEditInfo(todo.id, todo.data.Mytodo)}
                >
                  {" "}
                  edit todo
                </button>
                <button onClick={() => handleDelete(todo.id)}>
                  {" "}
                  delete todo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
