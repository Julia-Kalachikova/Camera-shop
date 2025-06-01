import { CameraCategory, CameraLevel, CameraType } from './const';


export type ProductCardType = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
  description: string;
  level: CameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};


export type ProductOrderType = {
  camerasIds: number[];
  coupon?: string | null;
}

export type ProductCardPromoType = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type ReviewType = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
};


// export type CallRequestType = {
//   camerasIds: [number];
//   coupon: null;
//   tel: string;
// };

export enum SortType {
  Price = 'price',
  Popular = 'popular'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}
