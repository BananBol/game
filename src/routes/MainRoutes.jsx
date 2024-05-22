import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/mainPage/MainPage'
import DetailPage from '../pages/detailPage/DetailPage'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainPage/>}/>
      <Route path={'/:id'} element={<DetailPage/>}/>
    </Routes>
  )
}

export default MainRoutes