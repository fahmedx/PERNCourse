import React, { Fragment, useState } from "react";

const EditTodo = ({todo}) => {
    const [st_desc, setDescription] = useState(todo.st_desc);

    const updateDescription = async (e) =>{
        e.preventDefault();
        try {
            const body = {st_desc};
            const response = await fetch(`http://localhost:5000/todos/${todo.id_todo}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location ="/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>

            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.id_todo}`}>Edit</button>


            <div id={`id${todo.id_todo}`} class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit todos</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={() => setDescription(todo.st_desc)}>&times;</button>                            
                        </div>
                        <div class="modal-body">
                            <input type="text" className="form-control" value={st_desc} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e => updateDescription(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.st_desc)}>Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;