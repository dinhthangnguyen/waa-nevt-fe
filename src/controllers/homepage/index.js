import React from "react";
import { TodayPick, Trending, Affordable } from "./components";
import "./index.css"
export const HomePage = () => {

    return (
        <>
            <TodayPick />
            <Trending />
            <Affordable />
        </>
    )

}