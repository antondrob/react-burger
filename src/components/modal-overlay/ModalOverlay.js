import React from 'react';
import {useDispatch} from "react-redux";
import ModalOverlayStyles from './ModalOverlayStyles.module.css';
import {closeModal} from "../../services/actions/modal";

function ModalOverlay() {
    const dispatch = useDispatch();
    return <div onClick={() => dispatch(closeModal())} className={ModalOverlayStyles.overlay}></div>
}

export default ModalOverlay;