import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import ModalStyles from './ModalStyles.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function Modal({children, header, onClose}) {
    return ReactDOM.createPortal(
        (
            <>
                <div className={ModalStyles.modal}>
                    <div className={ModalStyles.headingWrapper}>
                        <h2 className="text text_type_main-large">{header}</h2>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                    {children}
                </div>
                <ModalOverlay onClose={onClose}/>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string,
    children: PropTypes.element.isRequired
};

export default Modal;