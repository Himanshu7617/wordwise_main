
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/FirebaseContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <BrowserRouter  future={{ v7_startTransition: true, v7_relativeSplatPath: true,}}>
            <FirebaseContext>
                <App />
            </FirebaseContext>
        </BrowserRouter>
);
