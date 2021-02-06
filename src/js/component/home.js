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
	const welcome = document.querySelector("#welcome");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(
		() => {
			fetch(completeUrl)
				.then(response => {
					if (!response.ok) {
						createNewUser();
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

	const createNewUser = () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([])
		};
		fetch(completeUrl, requestOptions).then(response => {
			setListItems([]);
			response.json();
		});
	};

	const removeList = () => {
		fetch(completeUrl, {
			method: "DELETE"
		}).then(() => {
			console.log("removed");
		});
		setListItems([]);
		setUser("");
		welcome.innerHTML = "tu lista se ha borrado correctamente";
	};
	//HACER FUNCION PARA BOTON LOGOUT
	const logOut = () => {};

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

	const showWelcome = () => {
		welcome.classList.remove("d-none");
		welcome.innerHTML = "Welcome " + user;
	};

	return (
		<Fragment>
			<content className="container-fluid">
				<div className="row todoList">
					<form
						className="col-lg-4 col-sm-12"
						onSubmit={e => {
							e.preventDefault();
						}}>
						<h1 id="welcome" className="d-none" />
						<input
							className="input col-12"
							type="text"
							onChange={e => {
								setValue(e.target.value);
							}}
							onKeyPress={e => {
								createTask(e);
							}}
							placeholder="Something to remember?"
							value={currentValue}
						/>
					</form>
					<ul className="list col-lg-4 col-sm-12">{newTask}</ul>
					<div className="col-lg-4 col-sm-12 buttons">
						<button
							className="btn mr-1 button_findList"
							onClick={handleShow}>
							Find a List
						</button>
						<button
							className="btn mr-1 button_createList"
							onClick={handleShow}>
							Create List
						</button>
						<button
							className="btn button_deleteList"
							onClick={() => {
								removeList();
							}}>
							Delete List
						</button>
					</div>
				</div>

				<Modal
					className="modal_container"
					show={show}
					onHide={handleClose}>
					<Modal.Header className="modal_header" closeButton />
					<form
						className="modal_form"
						onSubmit={e => {
							e.preventDefault();
							{
								user;
							}
						}}>
						<input
							className="modal_input"
							type="text"
							onChange={e => {
								setUser(e.target.value);
							}}
							value={user}
							placeholder="What's your name?"
						/>
					</form>
					<Modal.Footer className="modal_footer">
						<Button
							className="modal_button"
							variant="primary"
							onClick={() => {
								handleClose();
								setHelp(!help);
								showWelcome();
							}}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</content>
		</Fragment>
	);
}
