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
	let userUrl = user;
	const [test, setTest] = useState(false);
	console.log(userUrl);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(
		() => {
			fetch(completeUrl)
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
					console.log("estoy ejecutando");
					let prueba = Object.values(responseAsJson);
					setListItems(prueba);
				});
		},
		[test]
	);

	useEffect(
		() => {
			fetch(completeUrl, {
				method: "PUT",
				body: JSON.stringify(listItems),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response => {
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
			<p>{user}</p>

			<Button variant="primary" onClick={handleShow}>
				Launch demo modal
			</Button>

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
							console.log(completeUrl);
							console.log(listItems);
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
							setTest(!test);
						}}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}
