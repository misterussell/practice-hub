// tracking functions

// modal control
function getModal(){
  let title = `Game Over.`;
  let header = `Your Civilization has died.`;
  let text = `Your Civiliation survived for X generations.`
  let modal = {
    title,
    header,
    text
  };

  return modal;
}

export { getModal };
