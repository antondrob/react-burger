import React from 'react';
import ModalOverlayStyles from './ModalOverlayStyles.module.css';
import PropTypes from "prop-types";
function ModalOverlay({ onClose }) {
    return <div onClick={onClose} className={ModalOverlayStyles.overlay}></div>;
}
ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};
export default ModalOverlay;
