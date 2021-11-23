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
    case 'blue':
      return {
        backgroundColor: '#007bff',
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
export function chipColorer(status: string) {
  switch (status) {
    case 'new':
      return {
        backgroundColor: '#007bff',
      };
      break;
    case 'logo-ready':
      return {
        backgroundColor: '#fd7e14',
      };
      break;
    case 'ready':
      return {
        backgroundColor: '#dc3545',
      };
      break;
    case 'delivered':
      return {
        backgroundColor: '#20c997',
      };
      break;
    default:
      return {};
  }
}
export function capitalCase(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export function productTypeBeautifier(productType: string) {
  switch (productType) {
    case 'sweat':
      return 'Sweat shirt';
      break;
    case 'tshirt':
      return 'T-shirt';
      break;
    case 'logo-ready':
      return 'Logo ready';
      break;
    case 'mug':
      return 'Mug';
      break;
    default:
      return capitalCase(productType);
  }
}
