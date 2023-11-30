import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Layout from '../../components/Layout/Layout'
import Home from '../Home/Home'
import SelectHero from '../SelectHero/SelectHero'
import HeroDashboard from '../HeroDashboard/HeroDashboard'
import Login from '../Login/Login'
import ErrorPage from '../ErrorPage/ErrorPage'
import Edit from '../Edit/Edit'
import EditCreature from '../../components/EditCreature/EditCreature'
import EditQuest from '../../components/EditQuest/EditQuest'

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="selecthero" element={<SelectHero />} />
                    <Route path="herodashboard" element={<HeroDashboard />} />
                    <Route path="login" element={<Login />} />
                    <Route path="edit" element={<Edit />} />
                    <Route path="editcreature/:creatureId" element={<EditCreature />} />
                    <Route path="editquest/:questId" element={<EditQuest />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}