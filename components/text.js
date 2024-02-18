let text = '';

export const setText = (newText) => {
  document.querySelector('#text-container').innerHTML = newText;
}

export const textElem = `
  <div id="text-container">
    ${text}
  </div>
`;