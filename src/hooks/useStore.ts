import { useReducer } from 'react';
import { type State, type Action, type FromLanguage, type Language } from '../types';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'es',
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case 'INTERCHANGE_LANGUAGES': {
      if (state.fromLanguage === 'auto') return state

      return ({
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        result: '',
      })
    }

    case 'SET_FROM_LANGUAGE': {
      if (state.fromLanguage === action.payload) return state;

      const loading = state.fromText !== '';

      return ({
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading,
      });
    }

    case 'SET_TO_LANGUAGE': {
      if (state.toLanguage === action.payload) return state;

      const loading = state.fromText !== '';

      return ({
        ...state,
        toLanguage: action.payload,
        result: '',
        loading,
      });
    }

    case 'SET_FROM_TEXT': {
      const loading = action.payload !== '';

      return ({
        ...state,
        loading,
        fromText: action.payload,
        result: '',
      });
    }

    case 'SET_RESULT': {
      return ({
        ...state,
        loading: false,
        result: action.payload,
      });
    }

    default: return state;
  }
}

export function useStore() {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
  }, dispatch] = useReducer(reducer, initialState);

  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' });

  const setFromLanguage = (payload: FromLanguage) =>
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })

  const setToLanguage = (payload: Language) =>
    dispatch({ type: 'SET_TO_LANGUAGE', payload })

  const setFromText = (payload: string) =>
    dispatch({ type: 'SET_FROM_TEXT', payload })

  const setResult = (payload: string) =>
    dispatch({ type: 'SET_RESULT', payload })


  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}