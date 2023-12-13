export interface IProductCategory {
  id: number,
  name: string,
  image?: string,
  creationAt: string
  updatedAt: string
}

export interface IProduct {
  id: number,
  title: string,
  price: number,
  description?: string,
  category: IProductCategory,
  images?: string[]
  creationAt?: string
  updatedAt?: string
}

export interface IProductDTO {
  title: string,
  price: number,
  description?: string,
  categoryId: number,
  images?: string[]
}