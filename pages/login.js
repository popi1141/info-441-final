import React from "react";
import { withPublic } from "../utils/route";
import LoginButton from "../components/LoginButton";

function Login({ auth }) {
	return (
		<div>
			<LoginButton/>
		</div>
	);
}

export default withPublic(Login);