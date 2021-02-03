import React, { useState, Fragment, useEffect } from "react";
import Task from "./task.jsx";
import { Modal, Button } from "react-bootstrap";

export function Home() {
	const [listItems, setListItems] = useState([]);
	const [currentValue, setValue] = useState("");
	const [show, setShow] = useState(false);
	const [user, setUser] = useState("");
	const url = "https://assets.breatheco.de/apis/fake/todos/user/";
	let completeUrl = url.concat(user);
	const [help, setHelp] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(
		() => {
			//fetch(completeUrl)
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/almuandjose"
			)
				.then(response => {
					//CREAR FUNCION CREATE USER
					if (!response.ok) {
						const requestOptions = {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify([])
						};
						fetch(completeUrl, requestOptions).then(response => {
							response.json();
						});
					}
					return response.json();
				})
				.then(responseAsJson => {
					let newListItems = Object.values(responseAsJson);
					setListItems(newListItems);
				});
		},
		[help]
	);

	useEffect(
		() => {
			//fetch(completeUrl,
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/almuandjose",
				{
					method: "PUT",
					body: JSON.stringify(listItems),
					headers: {
						"Content-Type": "application/json"
					}
				}
			).then(response => {
				return response.json();
			});
		},
		[listItems]
	);

	const createTask = e => {
		if (e.key == "Enter") {
			setListItems(listItems => [
				...listItems,
				{
					label: currentValue,
					done: false
				}
			]);

			setValue("");
		}
	};

	const taskDone = index => {
		const taskCompleted = [...listItems];
		taskCompleted[index].done = true;
		setListItems(taskCompleted);
	};
	const clickDelete = targetIndex => {
		setListItems(listItems.filter((_, index) => index !== targetIndex));
	};

	let newTask = listItems.map((item, index) => {
		return (
			<Task
				label={item.label}
				done={item.done}
				key={index.toString()}
				onMyClick={() => {
					clickDelete(index);
				}}
				taskDone={() => {
					taskDone(index);
				}}
			/>
		);
	});

	return (
		<Fragment>
			<content className="container-fluid">
				<div className="row todoList">
					<h1 className="col-lg-4 col-sm-12 bg-danger">ToDo List</h1>
					<form
						className="col-lg-4 col-sm-12 bg-danger"
						onSubmit={e => {
							e.preventDefault();
						}}>
						<input
							className="col-12"
							type="text"
							onChange={e => {
								setValue(e.target.value);
							}}
							onKeyPress={e => {
								createTask(e);
							}}
							placeholder="Put anotther TODO"
							value={currentValue}
						/>
					</form>
					<ul className="col-lg-4 col-sm-12 bg-danger">{newTask}</ul>
					<div className="col-lg-4 col-sm-12 bg-danger buttons">
						<button
							className="btn btn-primary mr-1"
							onClick={handleShow}>
							Login
						</button>
						<button
							className="btn btn-primary"
							onClick={handleShow}>
							New User
						</button>
					</div>
				</div>

				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<form
						onSubmit={e => {
							e.preventDefault();
							{
								user;
							}
						}}>
						<input
							type="text"
							onChange={e => {
								setUser(e.target.value);
							}}
							value={user}
							placeholder="What's your name?"
						/>
					</form>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button
							variant="primary"
							onClick={() => {
								handleClose();
								setHelp(!help);
							}}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</content>
		</Fragment>
	);
}
