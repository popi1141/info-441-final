import { useRouter } from "next/dist/client/router";
import React from "react";
import useAuth from "../utils/auth";

export default function DefaultLayout({ children }) {
	const auth = useAuth();
	const router = useRouter();
	return (
		<main>
			{children}
		</main>
	);
	// if (router.pathname !== "/login") {
	// 	return (
	// 		<main>
	// 			{children}
	// 		</main>
	// 	);
	// } else {
	// 	return children;
	// }
}