import React from 'react';
import {useMySelector} from "../../hooks/_redux/useMySelector.hook";

const MiniCart = () => {
    const auth = useMySelector((state) => state.auth);

    return (
        <div>
            
        </div>
    );
};

export default MiniCart;