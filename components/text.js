let text = '';

export const setText = (newText) => {
  const textContainer = document.querySelector('#text-container');
  textContainer.innerHTML = newText;

  const textParent = document.querySelector('#text');
  textParent.scrollTop = textParent.offsetTop;
}

export const textElem = `
  <div id="text-container">
    ${text}
  </div>
`;