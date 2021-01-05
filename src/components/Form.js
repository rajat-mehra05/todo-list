import React, {useState} from 'react'

const Form = () => {
    const [todo, setTodo] = useState("");
    const [allTodos, setAllTodos] = useState([]);

    const [editId, setEditId] = useState(0);

    const handleSubmit = (e) => {
      e.preventDefault();

      /* after clicking on save */
      if (editId) {
        const editTodo = allTodos.find((i) => i.id === editId);
        const updatedTodos = allTodos.map((t) =>
          t.id === editTodo.id
            ? (t = { id: t.id, todo })
            : { id: t.id, todo: t.todo }
        );
        setAllTodos(updatedTodos);
        setEditId(0);
        setTodo("");
        return;
      }

      if (todo !== "") {
        setAllTodos([{ id: `${todo}-${Date.now()}`, todo }, ...allTodos]);
        setTodo(""); /* provide a value to input  */
      } else {
          alert("Please add tasks!")
      }
    };

    const handleDelete = (id) => {
        const delTodo = allTodos.filter((del) => del.id !== id);
        
        setAllTodos([...delTodo]);
    }

    const handleEdit = (id) => {
        const editTodo = allTodos.find((selected) => selected.id === id);
        setTodo(editTodo.todo); /* editTodo takes object */
        setEditId(id);
    }

    return (
      <div>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What are your tasks today?"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="add" type="submit">
          {
              editId ? <i class="fas fa-save"></i> : <i class="fa fa-plus" aria-hidden="true"></i> 
          }
          </button>
        </form>

        <ul className="list-container">
          {/* mapping through allTodos */}
          {allTodos.map((t) => (
            <li className="list-item">
              <span className="list-header" key={t.id}> {/* provide key id */}
              {t.todo} 
              </span>
              <button className="edit" onClick={() => handleEdit(t.id) }> <i class="fas fa-edit"></i></button>
              <button className="delete" onClick={() => handleDelete(t.id) }> <i class="fas fa-trash-alt"></i></button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Form;