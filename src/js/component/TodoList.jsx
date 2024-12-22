import React, {useState} from 'react'; 

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
            setInputValue(updatedTasks);
        };

    return (
    <div className="list-group">
        <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} onKeyDown={addTask} className="list-group-item"/>
        
            <ul>
            {
                list.map((item, index)=>{
                    return <li className="list-group-item" key={index}>{item}</li>
                })
            }
            </ul>

     </div>
     ); 
};

export default TodoList; 