import { Record } from './models';

export const RECORDS_MOCK: Record[] = [
  {
    id: '65424984',
    type: 'Product Sale',
    description: 'tshirt',
    date: new Date(2021, 11, 5, 12, 9),
    value: 2200,
    productSold: 'sweat',
  },
  {
    id: '543453',
    type: 'Product Sale',
    description: 'sweat shirt',
    date: new Date(2021, 10, 28, 14, 49),
    value: 2500,
    productSold: 'sweat',
  },
  {
    id: '3218812',
    type: 'Product Sale',
    description: 'mug',
    date: new Date(2021, 10, 23, 19, 17),
    value: 1000,
    productSold: 'mug',
  },
  {
    id: '78245278',
    type: 'Restock',
    description: 'tshirts',
    date: new Date(2021, 10, 22, 22, 37),
    value: 15000,
  },
  {
    id: '6541321',
    type: 'Financing',
    description: 'from owner',
    date: new Date(2021, 10, 17, 16, 8),
    value: 10000,
  },
  {
    id: '3265431',
    type: 'Payment',
    description: 'to worker',
    date: new Date(2021, 11, 7, 11, 41),
    value: 11000,
  },
  {
    id: '32156436',
    type: 'Other',
    description: 'dkjfgbkjbsdfglkjdfbgljdfbgkdjfbgdddddd',
    date: new Date(2021, 11, 7, 11, 41),
    value: 2000,
  },
];
