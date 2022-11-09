function strCut(text, limit) {
  text = text.trim();
  var sliced = text.slice(0, 50);
  if (sliced.length < text.length) {
    sliced += "...";
  }
  return sliced;
}

export default strCut;
