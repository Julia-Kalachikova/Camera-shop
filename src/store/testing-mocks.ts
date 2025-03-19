import { ProductCardType, ReviewType } from '../types';

export const cardsMocks: ProductCardType[] = [
  {
    'id': 1,
    'name': 'Ретрокамера Dus Auge lV',
    'vendorCode': 'DA4IU67AD5',
    'type': 'Коллекционная',
    'category': 'Видеокамера',
    'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
    'level': 'Нулевой',
    'price': 65000,
    'rating': 5,
    'reviewCount': 16,
    'previewImg': 'img/content/das-auge.jpg',
    'previewImg2x': 'img/content/das-auge@2x.jpg',
    'previewImgWebp': 'img/content/das-auge.webp',
    'previewImgWebp2x': 'img/content/das-auge@2x.webp'
  },
  {
    'id': 3,
    'name': 'Instaprinter P2',
    'vendorCode': 'KLU789GH56',
    'type': 'Цифровая',
    'category': 'Фотоаппарат',
    'description': 'Компактная модель позволяющая получать чёткие снимки с 25-кратным зумом. В комплекте зарядное устройство и бархатный чехол, а так же удобный шнурок на шею.',
    'previewImg': 'img/content/instaprinter.jpg',
    'level': 'Нулевой',
    'price': 8430,
    'previewImg2x': 'img/content/instaprinter@2x.jpg',
    'previewImgWebp': 'img/content/instaprinter.webp',
    'previewImgWebp2x': 'img/content/instaprinter@2x.webp',
    'rating': 3,
    'reviewCount': 18
  },
];
export const cardMock: ProductCardType = {
  'id': 1,
  'name': 'Ретрокамера Dus Auge lV',
  'vendorCode': 'DA4IU67AD5',
  'type': 'Коллекционная',
  'category': 'Видеокамера',
  'description': 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
  'level': 'Нулевой',
  'price': 65000,
  'rating': 5,
  'reviewCount': 16,
  'previewImg': 'img/content/das-auge.jpg',
  'previewImg2x': 'img/content/das-auge@2x.jpg',
  'previewImgWebp': 'img/content/das-auge.webp',
  'previewImgWebp2x': 'img/content/das-auge@2x.webp'
};
export const reviewMock: ReviewType[] = [
  {
    'id': 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
    'createAt': '2022-07-09T13:24:57.980Z',
    'cameraId': 1,
    'userName': 'Кирилл',
    'advantage': 'Легкая в плане веса, удобная в интерфейсе',
    'disadvantage': 'Быстро садиться зарядка',
    'review': 'Это моя первая камера. Я в восторге, нареканий нет',
    'rating': 5
  }
];
