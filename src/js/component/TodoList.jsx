import React, { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const TodoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);




    const addTask = (event) => {

        if (event.which === 13) {

            setList([...list, inputValue]);

            setInputValue(' ');

            return
        };

    };

    const deleteTask = (index) => {
        const updatedTasks = list.filter((_, item) => item !== index);
        setList(updatedTasks);
    };
    const handleMouseOver = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'inline-block';
    };

    const handleMouseOut = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'none';
    };

    return (
        <div className="d-grid ">

            <input type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={addTask}
                className="list-group-item-success"
            />

            <ul className="list-group">
                {list.length === 0 ? (<li className="list-group-item-success text-start text-muted">No hay tareas. Agrega una tarea arriba! :)</li>) : (list.map((item, index) => (
                    <li
                        key={index}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        className="list-group-item-success d-flex justify-content-between"> {item}

                        <button
                            onClick={() => deleteTask(index)}
                            style={{ display: 'none', cursor: 'pointer' }}><HiOutlineXMark />

                        </button>
                    </li>

                ))
                )}

            </ul>

        </div>
    );
};

export default TodoList;

