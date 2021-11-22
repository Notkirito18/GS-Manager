export function getCount(
  stock: any[],
  type?: string,
  color?: string,
  size?: string,
  mugType?: string
): number {
  if (type !== 'mug') {
    return stock
      .filter((item) => {
        if (!type) {
          return item;
        }
        return item.type === type;
      })
      .filter((item) => {
        if (!color) {
          return item;
        }
        return item.color === color;
      })
      .filter((item) => {
        if (!size) {
          return item;
        }
        return item.size === size;
      }).length;
  } else {
    if (mugType) {
      return stock.filter((item) => {
        return item.mugType === mugType;
      }).length;
    } else {
      return stock.filter((item) => {
        return item.type === type;
      }).length;
    }
  }
}
export function colorer(color: string) {
  switch (color) {
    case 'yellow':
      return {
        backgroundColor: '#ffbe0b',
        color: 'black',
      };
      break;
    case 'white':
      return {
        backgroundColor: 'white',
        color: 'black',
      };
      break;
    case 'dark-red':
      return {
        backgroundColor: '#9b2226',
        color: 'white',
      };
      break;
    case 'red':
      return {
        backgroundColor: '#e63946',
        color: 'white',
      };
      break;
    default:
      return {
        backgroundColor: '#212529',
        color: 'white',
      };
  }
}
export function capitalCase(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
