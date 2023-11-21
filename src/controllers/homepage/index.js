import React from "react";
import { CarCollection } from "./components";
import "./index.css"
export const HomePage = () => {

    return (
        <>
            <CarCollection title={"TODAY'S PICK"} apiPath={"api/cars/todaypick"} />
            <CarCollection title={"MOST AFFORDABLE"} apiPath={"api/cars/affordable"} />
            <CarCollection title={"TRENDING"} apiPath={"api/cars/trending"} />
        </>
    )

}