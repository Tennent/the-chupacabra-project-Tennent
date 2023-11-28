import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from '../Layout/Layout'
import Home from '../Home/Home'
import SelectHero from '../SelectHero/SelectHero'
import HeroDashboard from '../HeroDashboard/HeroDashboard'
import ErrorPage from '../ErrorPage/ErrorPage'

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="selecthero" element={<SelectHero />} />
                    <Route path="herodashboard" element={<HeroDashboard />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}