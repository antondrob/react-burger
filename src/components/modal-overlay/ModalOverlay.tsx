import React from 'react';
import ModalOverlayStyles from './ModalOverlayStyles.module.css';
import {useHistory} from "react-router-dom";
import {TModalOverlayProps} from "../../services/types";

function ModalOverlay({closeModal}: TModalOverlayProps) {
    const history = useHistory();
    return <div onClick={() => closeModal(history)} className={ModalOverlayStyles.overlay}></div>
}
export default ModalOverlay;