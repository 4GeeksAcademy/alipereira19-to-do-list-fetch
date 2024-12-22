import React from "react";
import TodoList from "./TodoList.jsx";
//include images into your bundle


//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<h1>My To-Do List</h1>
			<TodoList/> 
		</div>
	);
};

export default Home;
