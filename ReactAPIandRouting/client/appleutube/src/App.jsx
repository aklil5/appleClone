import './App.css'

import '../src/assets/css/bootstrap.css'
import '../src/assets/css/styles.css'


import Home from './Components/Main/Home'

import { Route, Routes } from 'react-router-dom'
import SharedLayout from './Components/Main/Pages/SharedLayout'
import Iphone from './Components/Main/Pages/Iphone/Iphone'
import ProductPage from './Components/Main/Pages/ProductPage/ProductPage'
import Logo from './Components/Main/Pages/Logo/Logo'
import Ipad from './Components/Main/Pages/Ipad/Ipad'
import Watch from './Components/Main/Pages/Watch/Watch'
import TV from './Components/Main/Pages/TV/TV'
import Mac from './Components/Main/Pages/Mac/Mac'
import Music from './Components/Main/Pages/Music/Music'
import Support from './Components/Main/Pages/Support/Support'
import Search from './Components/Main/Pages/Search/Search'
import Cart from './Components/Main/Pages/Cart/Cart'

import Four04 from './Components/Main/Pages/Four04/Four04'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index  element={<Home />} /> 
            

          <Route path='logo' element={<Logo />}/>
          <Route path="iphone" element={<Iphone />}/>
          <Route path="iphone/:productID" element={<ProductPage />}/>

          <Route path="ipad" element={<Ipad />} />
          <Route path="watch" element={<Watch />} />
          <Route path="tv" element={<TV />} />
          <Route path="mac" element={<Mac />} />
          <Route path="music" element={<Music />} />
          <Route path="support" element={<Support />} />
          <Route path='search' element={<Search /> }/>
          <Route path="cart" element={<Cart />} />

          <Route path="*" element={<Four04 />}/>
          

        </Route>
      </Routes>

      

      
      
      
    </>
  )
}

export default App
