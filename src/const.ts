export enum RoutePath {
  Catalog = '/',
  Product = '/cameras/:id',
  NOT_FOUND = '/*',
}

export type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';

export type CameraCategory = 'Видеокамера' | 'Фотоаппарат';

export type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';

export const totalStars = 5;

export const FeatureModule = {
  CARDS: 'cards',
  PRODUCT: 'product',
} as const;

export enum APIRoutes {
  Cards = '/cameras',
  Orders = '/orders'
}
