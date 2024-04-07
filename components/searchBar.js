import { getText } from "../services/http";
import { setText } from "./text";
import { fullScreenButton, initFullScreenButton } from "./buttonFullscreen";

export const searchBar = `
  <div id="controls">
    <div class="controls-item">
      <input
        id="search-box"
        class="controls-input"
        type="text"
        autocomplete="off"
        placeholder="Buscar cita"
      >

      <button
        id="search-button"
        class="controls-input controls-button"
      >
        <img src="/icons/text-search.svg"/>
      </button>
    </div>

    <div class="controls-item">
      <button
        id="btn-zoom-out"
        class="controls-input controls-button"
      >
        <img src="/icons/zoom-out.svg"/>
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
        <img src="/icons/zoom-in.svg"/>
      </button>
    </div>

    <div class="controls-item">
      ${ fullScreenButton }
    </div>
  </div>
`;

export const initSearchBar = () => {
  initFullScreenButton();

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

    // TODO: add funtionality to open on external screen
    // const window2 = window.open();
    // const textContainer = window2.document.createElement('div');
    // textContainer.setAttribute('id', 'text-container');
    // window2.document.body.appendChild(textContainer);

    // const styleElem = window2.document.createElement('style');
    // window2.document.head.appendChild(styleElem);

    // for (let index = 0; index < Object.entries(document.styleSheets[0].cssRules).length; index++) {
    //   styleElem.sheet.insertRule(document.styleSheets[0].cssRules[index].cssText);
    // }
    
    // textContainer.innerHTML = text;
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
