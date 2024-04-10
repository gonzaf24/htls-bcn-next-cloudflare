import { usePathname, useSearchParams } from 'next/navigation';

function useUrlParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const setQueryParam = (key: string, value: string) => {
    params.set(key, value);
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const removeQueryParam = (key: string) => {
    params.delete(key);
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  return {
    setQueryParam,
    removeQueryParam,
  };
}

export default useUrlParams;
