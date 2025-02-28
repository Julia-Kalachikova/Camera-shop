

export enum RoutePath {
  Catalog = '/',
  Product = '/camera/:id',
  NOT_FOUND = '/*',
  Basket = '/basket',
}

export type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategory = 'Видеокамера' | 'Фотоаппарат';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export const totalStars = 5;

export const FeatureModule = {
  CARDS: 'cards',
  PRODUCT: 'product',
  BASKET: 'basket',
} as const;

export enum APIRoutes {
  Cards = '/cameras',
}
