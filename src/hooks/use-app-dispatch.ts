import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import {Actions} from '../types/actions';

const useAppDispatch = () => {
    return useDispatch<Dispatch<Actions>>();
};

export default useAppDispatch;
