import React, { useEffect, useState } from "react";
import useAPI from "../../api";
import { useParams } from "react-router-dom";


export const CarDetail = () => {
    const params = useParams();
    const {GetClient} = useAPI();
    const [car, setCar] = useState({});

    useEffect(()=>{
        async function fetching () {
            await loadCar(params.sku);
        }
        fetching();
    },[])

    const loadCar = async (sku) => {
        const response = await GetClient("/api/cars/"+ sku);
        if (response.status === 200) {
            setCar(response.data);
            console.log(response.data);
        }
    }
    return (<>
        <h2>Car Detail</h2>
    </>)

}
