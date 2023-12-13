import React from 'react'
import { Routes, Route } from 'react-router-dom'

// auth
import LoginPage from './pages/auth/login-page'

// products
import ProductViewPage from './pages/products/product-view/product-view'
import ProductsList from './pages/products/products-list/products-list-page'
import ProductNewPage from './pages/products/product-new/product-new-page'
import ProductEditPage from './pages/products/product-edit/product-edit-page'

// users
import UsersListPage from './pages/users/users-list/users-list-page'
import UserViewPage from './pages/users/user-view/user-view-page'
import UserEditPage from './pages/users/user-edit/user-edit-page'
import UserNewPage from './pages/users/user-new/user-new-page'

import FileUploadPage from './pages/file-upload/file-upload-page'

function App() {
  console.log('🚀 Última atualização - 12/12/2023')

  return (
    <Routes>
      <Route path={'/'} element={<LoginPage />} />
      <Route path={'/login'} element={<LoginPage />} />

      <Route path={'/produtos'} element={<ProductsList />} />
      <Route path={'/produtos/:productId'} element={<ProductViewPage />} />
      <Route path={'/produtos/novo'} element={<ProductNewPage />} />
      <Route path={'/produtos/:productId/editar'} element={<ProductEditPage />} />

      <Route path={'/usuarios'} element={<UsersListPage />} />
      <Route path={'/usuarios/:userId'} element={<UserViewPage />} />
      <Route path={'/usuarios/:productId/editar'} element={<UserEditPage />} />
      <Route path={'/usuarios/novo'} element={<UserNewPage />} />

      <Route path={'/upload'} element={<FileUploadPage />} />

    </Routes>
  )
}

export default App
