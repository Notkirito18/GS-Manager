import { Product } from './models';
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
    case 'mug':
      return 'Mug';
      break;
    default:
      return capitalCase(productType);
  }
}
export function dateBeautifier(date: Date, withTime?: boolean) {
  let month = '';
  switch (date.getMonth()) {
    case 0:
      month = 'Jan';
      break;
    case 1:
      month = 'Feb';
      break;
    case 2:
      month = 'Mar';
      break;
    case 3:
      month = 'Apr';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'Jun';
      break;
    case 6:
      month = 'Jul';
      break;
    case 7:
      month = 'Aug';
      break;
    case 8:
      month = 'Sep';
      break;
    case 9:
      month = 'Oct';
      break;
    case 10:
      month = 'Nov';
      break;
    case 11:
      month = 'Dec';
      break;
  }
  if (withTime) {
    return (
      date.getDate().toString() +
      ' ' +
      month +
      ' ' +
      date.getFullYear().toString() +
      ' | ' +
      (date.getHours().toString().length > 1
        ? date.getHours().toString()
        : '0' + date.getHours().toString()) +
      ':' +
      (date.getMinutes().toString().length > 1
        ? date.getMinutes().toString()
        : '0' + date.getMinutes().toString())
    );
  } else {
    return (
      date.getDate().toString() +
      ' ' +
      month +
      ' ' +
      date.getFullYear().toString()
    );
  }
}
export function nextStatus(
  status: 'new' | 'ready' | 'delivered'
): 'new' | 'ready' | 'delivered' {
  switch (status) {
    case 'new':
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
  stock: Product[],
  productType: 'sweat' | 'tshirt',
  productColor: string,
  productSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
) {
  let available = false;
  for (let i = 0; i < stock.length; i++) {
    if (stock[i].type === productType) {
      if (stock[i].color === productColor) {
        if (stock[i].size === productSize) {
          available = true;
        }
      }
    }
  }
  return available;
}
export function checkAvailabilityMug(
  stock: Product[],
  mugType: 'shop' | 'magic' | 'thermos'
) {
  let available = false;
  for (let i = 0; i < stock.length; i++) {
    if (stock[i].mugType === mugType) {
      available = true;
    }
  }
  return available;
}
export function productOrderedId(
  stock: Product[],
  productType: 'sweat' | 'tshirt',
  productColor: string,
  productSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
) {
  let id = '';
  for (let i = 0; i < stock.length; i++) {
    if (stock[i].type === productType) {
      if (stock[i].color === productColor) {
        if (stock[i].size === productSize) {
          id = stock[i].id;
        }
      }
    }
  }
  return id;
}
export function recordsColorer(recordType: string, background?: boolean) {
  if (background) {
    switch (recordType) {
      case 'Product Sale':
        return {
          backgroundColor: '#2dc653',
        };
        break;
      case 'Financing':
        return {
          backgroundColor: '#2dc653',
        };
        break;
      case 'Merchandise':
        return {
          backgroundColor: '#f44336',
        };
        break;
      case 'Restock':
        return {
          backgroundColor: '#f44336',
        };
        break;
      case 'Payment':
        return {
          backgroundColor: '#f44336',
        };
        break;
      default:
        return {
          backgroundColor: 'yellow',
        };
    }
  } else {
    switch (recordType) {
      case 'Product Sale':
        return {
          color: '#2dc653',
        };
        break;
      case 'Financing':
        return {
          color: '#2dc653',
        };
        break;
      case 'Merchandise':
        return {
          color: '#f44336',
        };
        break;
      case 'Restock':
        return {
          color: '#f44336',
        };
        break;
      case 'Payment':
        return {
          color: '#f44336',
        };
        break;
      default:
        return {
          color: 'white',
        };
    }
  }
}
export function recordIconChooser(
  recordType: string,
  product?: string
): string {
  switch (recordType) {
    case 'Product Sale':
      if (product) {
        return product;
      } else {
        return '';
      }
      break;
    case 'Financing':
      return 'financing';
      break;
    case 'Merchandise':
      return 'merchandise';
      break;
    case 'Restock':
      return 'restock';
      break;
    case 'Payment':
      return 'payment';
      break;
    case 'Other':
      return 'other';
      break;
    default:
      return 'tshirt';
  }
}
export function recordDescriptionToIcon(str: string) {
  if (str.toLowerCase().includes('sweat')) {
    return 'sweat';
  } else if (str.toLowerCase().includes('mug')) {
    return 'mug';
  } else if (str.toLowerCase().includes('shirt')) {
    return 'tshirt';
  } else return '';
}
export function contentFill(str: string, component: 'title' | 'btn' | 'p') {
  if (component === 'title') {
    switch (str) {
      case 'financing':
        return 'Financing the balance';
        break;
      case 'payment':
        return 'Making a Payment';
        break;
      case 'merchandise':
        return 'Merchandise Bought';
        break;
      case 'edit':
        return 'Setting Balance';
        break;
      default:
        return;
    }
  } else if (component === 'btn') {
    switch (str) {
      case 'financing':
        return 'Financing';
        break;
      case 'payment':
        return 'Payment';
        break;
      case 'merchandise':
        return 'Merchandise Record';
        break;
      case 'edit':
        return 'Set Balance';
        break;
      default:
        return;
    }
  } else {
    switch (str) {
      case 'financing':
        return 'Please add the value you want to add to the balance.';
        break;
      case 'payment':
        return 'Please add the value of the payment.';
        break;
      case 'merchandise':
        return 'Please add the price of the merchandise bought.';
        break;
      case 'edit':
        return "Setting the balance will overwrite it's previous value.";
        break;
      default:
        return;
    }
  }
}

export function editTypeToType(
  str: string
):
  | 'Product Sale'
  | 'Merchandise'
  | 'Restock'
  | 'Financing'
  | 'Payment'
  | 'Other' {
  switch (str) {
    case 'financing':
      return 'Financing';
      break;
    case 'payment':
      return 'Payment';
      break;
    case 'merchandise':
      return 'Merchandise';
      break;
    case 'edit':
      return 'Other';
      break;
    default:
      return 'Other';
  }
}
