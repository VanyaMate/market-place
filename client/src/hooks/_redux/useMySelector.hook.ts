import {TypedUseSelectorHook, useSelector} from "react-redux";
import {StoreType} from "../../store/index.store";

export const useMySelector: TypedUseSelectorHook<StoreType> = useSelector;