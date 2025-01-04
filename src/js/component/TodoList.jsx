import React, { useState, useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const TodoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const [userName, setUserName] = useState("sampleUserJS2");
    const [turn, setTurn] = useState(false);
    const [identificador, setIdentificador] = useState("");


    const addTask = (event) => {

        if (event.which === 13) {

            setList([...list, inputValue]);

            setInputValue('');

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

    const handlerAddTask = async () => {
        let payload = {
            label: inputValue,
            is_done: false
        };
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                throw new Error("No sirvió :(");
            }
            let data = await response.json();
            setList([...list, data]);
        } catch (error) {
            console.error(error);

        };
    };

    const handlerDeleteUser = async () => {
        try {
            const responseDelete = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, { method: 'DELETE' })
            if (!responseDelete.ok) {
                throw new Error("No sirvió :(");
            }
        } catch (error) {
            console.error(error);

        };
    };

    const handlerCreateUser = async () => {
        try {
            const responseCreate = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, { method: 'POST' })
            if (!responseCreate.ok) {
                throw new Error("No sirvió :(");
            }
        } catch (error) {
            console.error(error);
        };
    };
    const handlerSearch = async () => {
        try {
            const responseSearch = await fetch(`https://playground.4geeks.com/todo/users/${userName}`)
            console.log(responseSearch);
            if (!responseSearch.ok) {
                throw new Error("No sirvió :(");
            }
            if (userName.length < 2) {
                alert("Está muy corto bro")
                return
            }
            setTurn(prev => !prev)
        } catch (error) {
            console.error(error);

        }
    };
    useEffect(() => {
        fetch("https://playground.4geeks.com/todo/users");
    }, [])
    return (
        <div className="d-grid">

            <input type="text" placeholder='Escribe tu usuario acá :)' onChange={(e) => setUserName(e.target.value)} />
            <div className='d-flex'>
                <button className='boton' onClick={handlerSearch}>Buscar</button>
                <button className='boton' onClick={handlerCreateUser}>Crear</button>
                <button className='boton' onClick={handlerDeleteUser}>Borrar user</button>
                <button className='boton' onClick={handlerAddTask}>Agregar tarea</button>
            </div>

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
                        className="list-group-item-success d-flex justify-content-between"> {item.label}

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

