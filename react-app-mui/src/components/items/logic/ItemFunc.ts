import {useNavigate} from "react-router-dom";
import dateFormat from "dateformat";
import {useDispatch, useSelector} from "react-redux";
import {ITask} from "../../../helpers/interfaces";
import {changeItemImportant, deleteItem, filterItems} from "../../../store/slices/itemsSlice";
import {useCallback, useEffect} from "react";
import {selectFilter} from "../../../store/store";


const ItemFunc = (item: ITask) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const {filterOption} = useSelector(selectFilter);

    const displayFormNav = () => navigate("/display-form");

    const editFormNav = () => navigate("/edit-form");

    const convertedDate = () => dateFormat(item.date, "yy-mm-dd HH:MM");

    const changeImportant = useCallback(() => dispatch(changeItemImportant(item)), [dispatch, item]);

    const removeItem = () => dispatch(deleteItem(item.id));

    useEffect(() => {
        dispatch(filterItems(filterOption));
    }, [filterOption, dispatch, changeImportant])

    return {changeImportant, displayFormNav, editFormNav, convertedDate, removeItem}
}

export default ItemFunc;