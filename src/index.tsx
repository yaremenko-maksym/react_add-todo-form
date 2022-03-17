import ReactDOM from 'react-dom';
import App from './App';
import { GoodsContextProvider } from './GoodsContext';

ReactDOM.render(
  <GoodsContextProvider>
    <App />
  </GoodsContextProvider>
  ,
  document.getElementById('root'),
);
