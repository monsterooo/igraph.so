export { chartDefaultOption, tooltip_map, TABLE_BAR_LINE_PIE } from './echartValue';
export { fromLineDatasetToTable, THEMES, BACKGROUND_THEMES, ASPECT_RATIO, getBackgroundLinear } from './echart';


export function hasParentWithClass(element: HTMLElement, className: string, include_self?: boolean) {
  if (include_self && element.classList.contains(className)) {
    return true;
  }
  // 遍历节点的所有父级节点
  while (element.parentElement) {
    element = element.parentElement;
    // 检查当前节点是否包含指定的类名
    if (element.classList.contains(className)) {
      return true;
    }
  }
  return false;
}

export function getElementTop(element: HTMLElement) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent as HTMLElement;

  while(current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent as HTMLElement;
  }

  return actualTop;
}

export function b64toFile(b64Data: string, filename: string, contentType: string) {
  let sliceSize = 512;
  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  let file = new File(byteArrays, filename, {type: contentType});
  return file;
}