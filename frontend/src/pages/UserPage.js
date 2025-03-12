import React from 'react'
import { useProtectedPage } from '../hooks/useProtectedPage'

const UserPage = () => {
  useProtectedPage()
  return (
    <div>UserPage</div>
  )
}

export default UserPage