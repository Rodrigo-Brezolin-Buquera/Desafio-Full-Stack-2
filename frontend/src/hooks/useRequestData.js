import { useState, useEffect } from "react";
import { api } from "../api/config";
import { getHeaders } from "../utils/storageManager";

export const useRequestData = (path, trigger) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(path, getHeaders());
            setData(res.data.result);
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }; 

    useEffect(() => {
        fetchData()
    }, [trigger]);

    return {data, loading, setLoading }
}
