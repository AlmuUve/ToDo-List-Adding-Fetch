import React, { useState, Fragment, useEffect } from "react";
import Task from "./task.jsx";

export function Home() {
	const [listItems, setListItems] = useState([]);
	const [currentValue, setValue] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/almuandjose")
			.then(response => {
				if (!response.ok) {
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify([])
					};
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/almuandjose",
						requestOptions
					).then(response => {
						response.json();
						console.log(response);
					});
				}
				return response.json();
			})
			.then(responseAsJson => console.log(responseAsJson));
	}, []);

	const createTask = e => {
		if (e.key == "Enter") {
			setListItems(listItems => [
				...listItems,
				{
					name: currentValue,
					done: false
				}
			]);
			setValue("");
		}
	};

	const clickDelete = targetIndex => {
		setListItems(listItems.filter((_, index) => index !== targetIndex));
	};

	let newTask = listItems.map((item, index) => {
		return (
			<Task
				name={item.name}
				key={index}
				id={index}
				onMyClick={() => {
					clickDelete(index);
				}}
			/>
		);
	});

	return (
		<Fragment>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}>
				<input
					type="text"
					onChange={e => {
						setValue(e.target.value);
					}}
					onKeyPress={e => {
						createTask(e);
					}}
					placeholer="Put anotther TODO"
					value={currentValue}
				/>
			</form>
			<div>{newTask}</div>
		</Fragment>
	);
}
