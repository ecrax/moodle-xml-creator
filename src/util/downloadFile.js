export const downloadFile = (xml, fileName) => {
  const element = document.createElement("a");
  const file = new Blob([xml], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = fileName + ".xml";
  document.body.appendChild(element);
  element.click();
};
