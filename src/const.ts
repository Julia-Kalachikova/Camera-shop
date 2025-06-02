export enum RoutePath {
  Catalog = '/',
  Product = '/cameras/:id',
  Cart = '/card',
  NOT_FOUND = '/*',
}

export type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategory = 'Видеокамера' | 'Фотокамера';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export const CAMERA_CATEGORY = {
  PHOTO: 'Фотокамера' as CameraCategory,
  VIDEO: 'Видеокамера' as CameraCategory,
};

export const CAMERA_TYPE = {
  FILM: 'Плёночная' as CameraType,
  INSTANT: 'Моментальная' as CameraType,
  DIGITAL: 'Цифровая' as CameraType,
  COLLECTIBLE: 'Коллекционная' as CameraType,
};

export const CAMERA_LEVEL = {
  ZERO: 'Нулевой' as CameraLevel,
  AMATEUR: 'Любительский' as CameraLevel,
  PRO: 'Профессиональный' as CameraLevel,
};

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
