export enum RoutePath {
  Catalog = '/',
  Product = '/cameras/:id',
  Basket = '/card',
  NOT_FOUND = '/*',
}

export type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategory = 'Видеокамера' | 'Фотоаппарат';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export const totalStars = 5;

export const FeatureModule = {
  CARDS: 'cards',
  PRODUCT: 'product',
  SORTING: 'sorting',
  FILTERS: 'filters',
  BASKET: 'basket',
} as const;

export enum APIRoutes {
  Cards = '/cameras',
  Orders = '/orders'
}
