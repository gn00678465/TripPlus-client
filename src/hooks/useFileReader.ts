import { useState, useEffect, useCallback, useRef } from 'react';

export function useFileReader(file?: File) {
  const [dataURL, setDataURL] = useState<string | null>(null);

  const readAsDataURL = useCallback((file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setDataURL(reader.result as string);
    };
  }, []);

  useEffect(() => {
    if (!file) return;
    readAsDataURL(file);
  }, [file, readAsDataURL]);

  return {
    dataURL
  };
}

export function useFileReaders(files?: File[]) {
  const [dataURLs, setDataURLs] = useState<string[]>([]);

  const readAsDataURL = useCallback((file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const dataURL = reader.result as string;
      setDataURLs((prevDataURLs) => [...prevDataURLs, dataURL]);
    };
  }, []);

  useEffect(() => {
    if (!files || files.length === 0) return;
    setDataURLs(() => []);
    files.map((file) => readAsDataURL(file));
  }, [files, readAsDataURL]);

  return {
    dataURLs
  };
}

export type UseFileReaderReturn = ReturnType<typeof useFileReader>;
