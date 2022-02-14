import React, { Children } from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateWrapper({ ...rest }) {
  const { currentUser } = useAuth()
  return currentUser ? <Outlet /> : <Navigate to='/login' />
}