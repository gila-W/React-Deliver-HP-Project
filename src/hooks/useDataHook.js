import { useState, useEffect } from "react";

export const useData = () => {
    const [appData, setAppData] = useState({ customers: [], packages: [] });

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                setAppData(data);
            });
    },
        []);
    return { appData: appData, setAppData: setAppData };
};