import React from "react";
import { withProtected } from "../utils/route";
import LogOutButton from "../components/LogOutButton";

function logOut({ auth }) {
	return (
		<div>
			<LogOutButton/>
		</div>
	);
}

export default withProtected(logOut);