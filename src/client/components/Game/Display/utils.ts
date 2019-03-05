export const getColor = (color: colorType) => {
  switch (color) {
    case 'black':
      return '#000';
    case 'grey':
      return '#333';
    case 'red':
      return '#b71c1c';
    case 'blue':
      return '#661010';
    case 'green':
      return '#E52323';
    case 'orange':
      return '#F22525';
    case 'purple':
      return '#CC1F1F';
    case 'skyBlue':
      return '#CC3627';
    case 'yellow':
      return '#661B14';
  }
};
