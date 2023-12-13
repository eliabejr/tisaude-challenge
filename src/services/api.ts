const baseUrl = import.meta.env.VITE_PUBLIC_API_URL

export const endpoints = {
  auth: {
    login: `${baseUrl}/api/v1/auth/login`,
    profile: `${baseUrl}/api/v1/auth/profile`,
  },
  products: {
    getProducts: (limit: number, offset: number) => `${baseUrl}/api/v1/products?limit=${limit}&offset=${offset}`,
    getProductsAll: `${baseUrl}/api/v1/products`,
    getProduct: (id: number) => `${baseUrl}/api/v1/products/${id}`,
    postProduct: `${baseUrl}/api/v1/products`,
    putProduct: (id: number) => `${baseUrl}/api/v1/products/${id}`,
    deleteProduct: (id: number) => `${baseUrl}/api/v1/products/${id}`,
  },
  categories: {
    getCategoriesAll: `${baseUrl}/api/v1/categories`,
  },
  users: {
    getUsers: (limit: number, offset: number) => `${baseUrl}/api/v1/users?limit=${limit}&offset=${offset}`,
    getUsersAll: `${baseUrl}/api/v1/users`,
    getUser: (id: number) => `${baseUrl}/api/v1/users/${id}`,
    postUser: `${baseUrl}/apI/v1/users`,
    putUser: (id: number) => `${baseUrl}/api/v1/users/${id}`,
    deleteUser: (id: number) => `${baseUrl}/api/v1/users/${id}`,
    userIsAvailable: `${baseUrl}/api/v1/users/is-available`,
  },
  files: {
    getFilen: (filename: string) => `${baseUrl}/api/v1/files/${filename}`,
    postFile: `${baseUrl}/api/v1/files/upload/`,
  },
}