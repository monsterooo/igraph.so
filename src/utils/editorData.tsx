import Handsontable from 'handsontable'

export enum JSDATA_TYPE {
  JSDATA_DIM_ARRAY = 'dimArray',
}

/**
 * 取的二维数组内层定义的数量大小
 * 如有有excel数据格式为：
 * 6,  5,  4,  3,  2
 * 16, 15, 14, 13, 12
 * 当dimColStep为3时，则数据结构为
 * [
 *    [[6,5,4], [16,15,14]],
 *    [[,3,2], [13,12]]
 * ]
 * 当dimColStep为max，表示无限大
 * [
 *    [[6,5,4,3,2], [16,15,14,13,12]]
 * ]
 * 这里暂时固定返回max，后期可以保存在状态中随时更改
 */
export function getDimColStep() {
  return 'max'
}

/**
 * 可以定义的类型有 DIM_ARRAY ARRAY_OBJECT GEO
 * 目前只先实现 DIM_ARRAY
 * @returns 
 */
export function getType() {
  return JSDATA_TYPE.JSDATA_DIM_ARRAY
}

export function getSeriesDim() {
  return getDimColStep() ? 2 : 1;
}

export function getJSData(hotInstance: Handsontable): any[][] {
  const jsData: any = [];
  const dataWindow = getDataWindowSize(hotInstance);
  const jsDataType = getType();
  const seriesInfo: any = getSeriesInfo(jsDataType, dataWindow.colCount);

  for(let seriesIndex = 0; seriesIndex < seriesInfo.count; seriesIndex++) {
    for(let rowIndex = 0; rowIndex < dataWindow.rowCount; rowIndex++) {
      let line = arrayGetJSDataLine(hotInstance, rowIndex, seriesIndex, seriesInfo);
      jsData.push(line);
    }
  }

  return jsData;
}

export function arrayGetJSDataLine(hotInstance: Handsontable, rowIndex: number, seriesIndex: number, seriesInfo: any) {
  let seriesIndexBase = seriesIndex * seriesInfo.colStep;
  let line;
  const itemDataType = 'auto';

  // 二维
  if (seriesInfo.seriesDim === 2) {
    line = [];
    for(let colRelatedIndex = 0; colRelatedIndex < seriesInfo.colStep; colRelatedIndex++) {
      let finalValue;
      if (rowIndex === 0) {
        // 我们让第一行始终使用string类型
        finalValue = get(hotInstance, rowIndex, colRelatedIndex + seriesIndexBase, 'string');
      } else {
        finalValue = get(hotInstance, rowIndex, colRelatedIndex + seriesIndexBase, itemDataType);
      }
      line.push(finalValue);
    }
  }
  // seriesInfo.seriesDim === 1
  return line;
}

export function getSeriesInfo(jsDataType: string, dataTableColCount: number) {
  let dimColStep = getDimColStep();
  let count;
  let colStep: any;

  if (jsDataType === JSDATA_TYPE.JSDATA_DIM_ARRAY) {
    if (dimColStep === 'max') {
      colStep = dataTableColCount;
      count = dataTableColCount ? 1 : 0;
    } else if (dimColStep) {
      colStep = dimColStep;
      count = Math.ceil(dataTableColCount / colStep);
    } else {
      count = dataTableColCount;
      colStep = 1;
    }
    // JSDATA_ARRAY_OBJECT
    // JSDATA_GEO
  }

  return {
    count,
    colStep,
    seriesDim: getSeriesDim()
  }
}

export function getNumber(v: any) {
  var vp = parseFloat(v as string);
  return v - vp >= 0 ? vp : null;
}

/**
 * 获取指定位置的数据
 * @param hotInstance 表格实例 
 * @param rowIndex 行索引
 * @param colIndex 列索引
 * @param dataType 数据类型
 * @returns {any}
 */
export function get(hotInstance: Handsontable, rowIndex: number, colIndex: number, dataType?: string) {
  const _data: any = hotInstance.getSourceData()[rowIndex];
  let value = _data ? _data[colIndex] : null;

  // 如果表格被编辑它的空值不会是null, 空值是''
  if (value === '') {
    value = null;
  }

  if (dataType === 'string') {
    value = value == null ? '' : String(value);
  } else if (dataType === 'number') {
    value = getNumber(value);
  } else if (dataType === 'auto') {
    let newValue = getNumber(value);
    if (newValue != null) {
      value = newValue;
    }
  }

  return value;
}

/**
 * 获取数据在表格中的边界
 * @param hotInstance 
 * @returns { colCount, rowCount }
 */
export function getDataWindowSize(hotInstance: Handsontable) {
  const colCount = hotInstance.countCols(); // 列总数
  const rowCount = hotInstance.countRows(); // 行总数

  // 找到行数据边界
  let i = rowCount - 1;
  let realRowCount = 0;
  for(; i >= 0; i--) { // y
    for(let j = 0; j < colCount; j++) { // x
      if (get(hotInstance, i, j) != null) {
        realRowCount = i + 1;
        break;
      }
    }
    if (realRowCount) {
      break;
    }
  }

  let j = colCount - 1;
  let realColCount = 0;
  for(; j >= 0; j--) {
    for(let i = 0; i < realRowCount; i++) {
      const val = get(hotInstance, i, j);
      if (val != null && val !== '') {
        realColCount = j + 1;
        break;
      }
    }
    if (realColCount) {
      break;
    }
  }

  return { colCount: realColCount, rowCount: realRowCount };
}