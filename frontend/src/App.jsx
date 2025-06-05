import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { Navbar } from './components/Navbar'
import { useAuthStore } from './store/useAuthStore.js'
import { Toaster } from 'react-hot-toast'
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect( () => {
    checkAuth()
  }, [checkAuth] )
  console.log({authUser})

  if (isCheckingAuth && !checkAuth) return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-infinity loading-xl size-16"></span>

    </div>

  )

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> :<Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={!authUser ? <SettingsPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />

        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App
