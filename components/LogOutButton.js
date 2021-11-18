import React from "react";
import { withProtected } from "../utils/route";
import Button from 'react-bootstrap/Button'

function LogOutButton({ auth }) {
	const { logout } = auth;
	return (
		<div>
			<Button variant="warning" onClick={logout}>Logout</Button>
		</div>
	);
}

export default withProtected(LogOutButton);