export function omit<T extends object>(data: T, keys: (keyof T)[]) {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => !keys.includes(key as keyof T)
    )
  );
}
