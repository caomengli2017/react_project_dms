import { useCallback, useEffect, useState } from 'react';

export type IUseLocalStorageOption = {
  key: string;
};
export function useLocalStorage<K = Object>(key: string) {
  const [state, setState] = useState<K | undefined>(() => {
    const _d = localStorage.getItem(key);
    if (!!_d) {
      return JSON.parse(_d);
    } else {
      return undefined;
    }
  });
  useEffect(() => {}, [key]);
  const setLocal = useCallback(
    (val: any) => {
      setState(val);
      localStorage.setItem(key, JSON.stringify(val));
    },
    [key]
  );
  const removeLocal = useCallback(() => {
    setState(undefined);
    localStorage.removeItem(key);
  }, [key]);
  return [state, setLocal, removeLocal] as const;
}
