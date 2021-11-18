import React from "react";
import { withPublic } from "../utils/route";
import Button from 'react-bootstrap/Button'

function LoginButton({ auth }) {
	const { user, loginWithGoogle, error } = auth;
	return (
		<Button variant="primary" onClick={loginWithGoogle}>Log In With Google</Button>
	);
}

export default withPublic(LoginButton);