
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalContext from './context/GlobalContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter  future={{ v7_startTransition: true, v7_relativeSplatPath: true,}}>
            <GlobalContext>
                <App />
            </GlobalContext>
        </BrowserRouter>
);
