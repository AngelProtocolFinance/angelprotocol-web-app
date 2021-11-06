import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useSetter = () => useDispatch<AppDispatch>();
export const useGetter: TypedUseSelectorHook<RootState> = useSelector;
