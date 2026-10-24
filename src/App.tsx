import { Route, Routes } from 'react-router-dom'

import { SiteShell } from './components/SiteShell'
import { CvPage } from './pages/CvPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PhotographyPage } from './pages/PhotographyPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="cv" element={<CvPage />} />
        <Route path="photography" element={<PhotographyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
