import React from 'react';
import ModalOverlayStyles from './ModalOverlayStyles.module.css';
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";

function ModalOverlay({closeModal}) {
    const history = useHistory();
    return <div onClick={() => closeModal(history)} className={ModalOverlayStyles.overlay}></div>
}
ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired
};
export default ModalOverlay;