const allowFullscreen = !!document.documentElement.requestFullscreen;
let isExpanded = false;

const buttonHtml = `
  <button
    id="btn-fullscreen"
    class="controls-input controls-button"
    title="Pantalla completa"
    >
    <img id="fullscreen-icon" src="/icons/fullscreen.svg" />
  </button>
`;

export const fullScreenButton = allowFullscreen ? buttonHtml : '';

export const initFullScreenButton = () => {
  if (!allowFullscreen) return;

  const fullscreenIcon = document.querySelector('#fullscreen-icon');
  const btnFullScreen = document.querySelector('#btn-fullscreen');
  btnFullScreen.addEventListener('click', () => toggleFullScreen());

  const toggleFullScreen = () => {
    if (!isExpanded) {
      document.documentElement.requestFullscreen();
      fullscreenIcon.src = '/icons/fullscreen-exit.svg';
      btnFullScreen.title="Salir de pantalla completa"
    } else {
      document.exitFullscreen();
      fullscreenIcon.src = '/icons/fullscreen.svg';
      btnFullScreen.title="Pantalla completa"
    }
    isExpanded = !isExpanded;
  }
}
