import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router'
import './index.css'
import App from './component/App'
import Main from './component/Main'

const router = createBrowserRouter([
  {path: '/', element: <App />, children: [
    {path: '/', element: <Main /> }
  ] }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
