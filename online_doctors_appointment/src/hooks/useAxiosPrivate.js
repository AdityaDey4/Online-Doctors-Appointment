import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = ()=> {

    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(()=> {

        const responseIntercerpt = axiosPrivate.interceptors.response.use(
            response=> response,
            async (error)=> {

                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {

                    prevRequest.sent = true;
                    const newAccessToken = await refresh();

                    return axiosPrivate(prevRequest);
                }
                else {
                    return Promise.reject(error);
                }
            }
        )

        return ()=> {
            axiosPrivate.interceptors.response.eject(responseIntercerpt);
        }
    }, [auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;