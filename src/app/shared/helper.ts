import { PRODUCTS_MOCK } from './PRODUCTS_MOCK';

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
        backgroundColor: '#fff000',
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
    case 'black':
      return {
        backgroundColor: '#212529',
        color: 'white',
      };
      break;
    default:
      return {
        border: '2px solid #212529',
        color: '#212529',
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
        backgroundColor: '#fff000',
        color: 'black',
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
export function nextStatus(
  status: 'new' | 'logo-ready' | 'ready' | 'delivered'
): 'new' | 'logo-ready' | 'ready' | 'delivered' {
  switch (status) {
    case 'new':
      return 'logo-ready';
      break;
    case 'logo-ready':
      return 'ready';
      break;
    case 'ready':
      return 'delivered';
      break;
    default:
      return 'new';
  }
}
export function IdGenerator() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
export function checkAvailability(
  productType: 'sweat' | 'tshirt',
  productColor: string,
  productSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
) {
  let available = false;
  for (let i = 0; i < PRODUCTS_MOCK.length; i++) {
    if (PRODUCTS_MOCK[i].type === productType) {
      if (PRODUCTS_MOCK[i].color === productColor) {
        if (PRODUCTS_MOCK[i].size === productSize) {
          available = true;
        }
      }
    }
  }
  return available;
}
export function checkAvailabilityMug(mugType: 'shop' | 'magic' | 'thermos') {
  let available = false;
  for (let i = 0; i < PRODUCTS_MOCK.length; i++) {
    if (PRODUCTS_MOCK[i].mugType === mugType) {
      available = true;
    }
  }
  return available;
}
