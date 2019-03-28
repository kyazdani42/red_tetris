export const handleClick = (setDisplayModal: any) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.9';
  setTimeout(getTimeout(target), 100);
  setDisplayModal(true);
};

export const getTimeout = (target: any) => () => {
  target.style.opacity = '1';
};
