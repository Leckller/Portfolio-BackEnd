import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Provider from './Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
)
