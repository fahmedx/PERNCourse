import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const deleteTodo = async (id) =>{
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.id_todo !== id))           
        } catch (err) {
            console.error(err.message);
        }
    }
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);
    console.log(todos);
    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                </tr>
                <tr>
                    <td>July</td>
                    <td>Dooley</td>
                    <td>july@example.com</td>
    </tr>*/}
                    {todos.map(todo => (
                        <tr key={todo.id_todo}>
                            <td>{todo.id_todo}</td>
                            <td>{todo.st_desc}</td>
                            <td><EditTodo todo = {todo}/></td>
                            <td><button className="btn btn-danger"
                                onClick={() => deleteTodo(todo.id_todo)}
                            >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;