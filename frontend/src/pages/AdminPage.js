import React from 'react'
import { useProtectedPage } from '../hooks/useProtectedPage'

const AdminPage = () => {
  useProtectedPage()
  return (
    <div>AdminPage</div>
  )
}

export default AdminPage