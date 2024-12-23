import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import HeaderLayout from './layout/header/HeaderLayout'
import AppLayout from './layout/app-layout/AppLayout'
import LinkTreeView from './views/DevTree/LinkTreeView'
import ProfileView from './views/DevTree/ProfileView'
import HandelView from './views/DevTree/HandleView'
import NotFoundView from './views/DevTree/NotFoundView'
import HomeView from './views/DevTree/HomeView'

export default function Router() {

  return(
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout/>}>
          <Route path={'/auth/login'} element={<LoginView />}/>
          <Route path={'/auth/register'} element={<RegisterView />}/>
        </Route>

        <Route path='/admin' element={<AppLayout/>}>
          <Route index={true} element={<LinkTreeView/>}/>
          <Route path={'profile'} element={<ProfileView/>}/>
        </Route>

        <Route path={'/:handle'} element={<HeaderLayout/>}>
          <Route index={true} element={<HandelView/>}/>
        </Route>

        <Route path='/' element={<HomeView />} />
        
        <Route path='/404' element={<HeaderLayout/>}>
          <Route index={true} element={<NotFoundView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}