export enum RoutePath {
  Catalog = '/',
  Product = '/cameras/:id',
  Cart = '/card',
  NOT_FOUND = '/*',
}

export type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategory = 'Видеокамера' | 'Фотокамера';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export const totalStars = 5;

export const FeatureModule = {
  CARDS: 'cards',
  PRODUCT: 'product',
  SORTING: 'sorting',
  FILTERS: 'filters',
  CART: 'cart',
  PROMO: 'promo'
} as const;

export enum APIRoutes {
  Cards = '/cameras',
  Orders = '/orders',
  Promo ='/promo',
}

export type VariantButtonAddItem = 'catalog' | 'productPage';
