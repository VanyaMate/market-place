import {useMemo} from "react";
import {useLocation} from "react-router-dom";

export const useSearchParams = function () {
    const location = useLocation();
    return useMemo(() => {
        const search = location.search;
        if (search[0] === '?') {
            const params = search.split('?')[1];
            if (!!params) {
                const paramsList = params.split('&');
                const paramsMap: { [key: string]: string } = {};
                for (let i = 0; i < paramsList.length; i++) {
                    const [key, value] = paramsList[i].split('=');
                    paramsMap[key] = decodeURI(value);
                }
                return paramsMap;
            }
        }
        return {};
    }, [location.search])
}