import {useMySelector} from "./_redux/useMySelector.hook";
import {useActions} from "./_redux/useActions.hook";
import {useLazyLogoutQuery, useTokenQuery} from "../store/auth/auth.api";
import {useEffect} from "react";

export const useUpdateUserByToken = function () {
    const auth = useMySelector((state) => state.auth);
    const {setUser, resetUser, updateCart} = useActions();
    const { isFetching, isError, data } = useTokenQuery(undefined, { skip: !auth.updateByToken });
    const [dispatchLogout, {}] = useLazyLogoutQuery();

    useEffect(() => {
        if (!isFetching && !isError && data) {
            if (data.cart) {
                setUser(data);
                updateCart(data.cart);
            } else {
                resetUser();
                dispatchLogout();
            }
        }
    }, [ isFetching, isError, data ])
}