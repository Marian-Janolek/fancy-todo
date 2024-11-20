export const sliceTitle = (title: string, length: number): string => {
  return title.length > length ? `${title.slice(0, length)}...` : title;
};

export const defaultModalState = 'closed';
