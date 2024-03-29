import { getText } from "../services/http";
import { setText } from "./text";

export const searchBar = `
  <div id="controls">
    <div class="controls-item">
      <input
        id="search-box"
        class="controls-input"
        type="text"
        autocomplete="off"
      >

      <button
        id="search-button"
        class="controls-input controls-button"
      >
        Buscar
      </button>
    </div>

    <div class="controls-item">
      <button
        id="btn-zoom-out"
        class="controls-input controls-button"
      >
        -
      </button>
      
      <input
        id="input-zoom"
        class="controls-input"
        type="number"
        value="100"
        min="100"
        max="2000"
        step="50"
      />

      <button
        id="btn-zoom-in"
        class="controls-input controls-button"
      >
        +
      </button>
    </div>

    <!--
    <div class="controls-item">
      <button
        id="btn-fullscreen"
        class="controls-input controls-button"
      >
        Pantalla completa
      </button>
    </div>
    -->
  </div>
`;

export const initSearchBar = () => {
  const searchBox = document.querySelector('#search-box');
  const searchButton = document.querySelector('#search-button');
  const inputZoom = document.querySelector('#input-zoom');
  const buttonZoomIn = document.querySelector('#btn-zoom-in');
  const buttonZoomOut = document.querySelector('#btn-zoom-out');

  buttonZoomIn.addEventListener('click', () => changeZoom('in'));
  buttonZoomOut.addEventListener('click', () => changeZoom('out'));
  searchButton.addEventListener('click', () => searchText(searchBox.value));
  searchBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchText(searchBox.value)
    }
  });
  
  const searchText = async (query) => {
    if (!query) return;

    const response = await getText(query);
    const text = await response.text() || '';

    console.log(text);
    
    setText(text);
  }

  const changeZoom = (type) => {
    const { value, step, min, max } = inputZoom;
    const currentZoom = Number(value);
    const zoomStep = Number(step);
    const zoomMin = Number(min);
    const zoomMax = Number(max);

    if (type === 'in' && currentZoom === zoomMax) return;
    if (type === 'out' && currentZoom === zoomMin) return;

    const zoom = type === 'in' ? currentZoom + zoomStep : currentZoom - zoomStep;
    document.querySelector('#text-container').style.zoom = `${ zoom }%`;
    inputZoom.value = zoom;
  }
};
