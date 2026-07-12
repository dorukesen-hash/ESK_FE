"use client"

import {useContext} from "react";
import {AppContext} from "@/Context/AppContext";


export default function Page() {
	const {state} = useContext(AppContext);
	const {user} = state

	return (
		<div>settings</div>
	)
}