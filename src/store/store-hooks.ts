import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, StateType } from './store-types';


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
