import React, { useState } from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li className={props.done ? "strike" : ""}>
			{props.label}
			<div className="icons">
				<i
					onClick={props.taskDone}
					className="fas fa-check-circle justify-content-end"
				/>
				<i
					onClick={props.onMyClick}
					className="fas fa-trash-alt mr-4"
				/>
			</div>
		</li>
	);
};
Task.propTypes = {
	label: PropTypes.string,
	onMyClick: PropTypes.func,
	taskDone: PropTypes.func,
	listItems: PropTypes.array,
	done: PropTypes.bool
};
export default Task;
