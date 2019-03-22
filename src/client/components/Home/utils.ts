export const handleClick = (setDisplayModal: any) => (e: any) => {
  const target = e.currentTarget;
  target.style.opacity = '0.9';
  setTimeout(() => {
    target.style.opacity = '1';
  }, 100);
  setDisplayModal(true);
};
