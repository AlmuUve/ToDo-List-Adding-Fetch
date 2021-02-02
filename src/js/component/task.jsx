import React, { useState } from "react";
import PropTypes from "prop-types";
import ListGroupItem from "react-bootstrap";

const Task = props => {
	return (
		<li className="list-group-item">
			{props.name}
			<i onClick={props.onMyClick} className="fas fa-trash-alt mr-4" />
		</li>
	);
};
Task.propTypes = {
	name: PropTypes.string,
	onMyClick: PropTypes.func
};
export default Task;
