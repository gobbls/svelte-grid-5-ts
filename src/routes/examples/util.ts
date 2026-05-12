export const id = () => '_' + Math.random().toString(36).substring(2, 9);
export const randomNumberInRange = (min: number, max: number) => Math.random() * (max - min) + min;