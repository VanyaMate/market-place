import {INotification} from "../store/notifications/notifications.slice";
import {useCallback} from "react";
import {useActions} from "./_redux/useActions.hook";

export const useNotifications = function () {
    const {addNotification, removeNotification} = useActions();
    return useCallback((notification: INotification, timer: number) => {
        const id = Date.now();
        addNotification({...notification, id});
        setTimeout(() => {
            removeNotification(id);
        }, timer)
    }, []);
}