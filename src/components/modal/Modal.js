import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useDispatch} from 'react-redux';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import ModalStyles from './ModalStyles.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {ESC_KEYCODE} from '../../services/apiVariables';
import {useHistory} from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({children, header}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const closeModal = (history) => {
        history.goBack();
    }

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === ESC_KEYCODE) {
                closeModal(history);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [dispatch, history]);

    return ReactDOM.createPortal(
        (
            <>
                <div className={ModalStyles.modal}>
                    <div className={ModalStyles.headingWrapper}>
                        <h2 className="text text_type_main-large">{header}</h2>
                        <CloseIcon type="primary" onClick={() => {closeModal(history)}}/>
                    </div>
                    {children}
                </div>
                <ModalOverlay closeModal={closeModal}/>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    header: PropTypes.string,
    children: PropTypes.element.isRequired
};

export default Modal;