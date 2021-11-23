export class Product {
  constructor(
    public id: string,
    public type: string,
    public color?: string,
    public size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL',
    public mugType?: 'shop' | 'magic' | 'thermos'
  ) {}
}

export class ShowProduct {
  constructor(
    public id: string,
    public type: string,
    public color: string,
    public imageGallery: string[]
  ) {}
}

export class Order {
  constructor(
    public id: string,
    public productType: string,
    public price: number,
    public status: 'new' | 'logo-ready' | 'ready' | 'delivered',
    public statusChangeDate: Date,
    public logoDescription: string,
    public logoImages?: string[],
    public instaProfile?: string,
    public mugType?: 'shop' | 'magic' | 'thermos',
    public color?: string,
    public size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL',
    public byAdmin?: boolean
  ) {}
}
