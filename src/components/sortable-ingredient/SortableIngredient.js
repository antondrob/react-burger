import {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import SortableIngredientStyles from '../sortable-ingredient/SortableIngredientStyles.module.css';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from "react-redux";
import {REMOVE_FROM_BURGER} from '../../services/actions/burgerConstructor';
import PropTypes from "prop-types";

const SortableIngredient = ({id, index, moveCard, name, image_mobile, price}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [{handlerId}, drop] = useDrop({
        accept: 'helloWorld',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{isDragging}, drag] = useDrag({
        type: 'helloWorld',
        item: () => {
            return {id, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (
        <div ref={ref} style={{opacity}} data-handler-id={handlerId}
             className={SortableIngredientStyles.chosenItem}>
            <DragIcon/>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image_mobile}
                handleClose={() => {
                    dispatch({
                        type: REMOVE_FROM_BURGER,
                        uniqueId: id
                    });
                }}
            />
        </div>
    );
};

SortableIngredient.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
};

export default SortableIngredient;