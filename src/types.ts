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
