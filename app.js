import './style.css';
import { mainView } from './views/main';
import { initSearchBar } from './components/searchBar';

document.querySelector('#app').innerHTML = `
  <div id="main">
    ${ mainView }
  </div>
`;

initSearchBar();