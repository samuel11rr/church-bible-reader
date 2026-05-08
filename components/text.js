import { EmptyScreen } from "./emptyScreen";

let text = '';

export const setText = (newText) => {
  const textContainer = document.querySelector('#text-container');
  textContainer.innerHTML = newText;

  const textParent = document.querySelector('#text');
  textParent.scrollTop = textParent.offsetTop;
}

  const content = text || EmptyScreen;

export const textElem = `
  <div id="text-container">
    ${content}
  </div>
`;