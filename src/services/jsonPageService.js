import httpService from "./httpService";
import _ from "lodash";

export const getPaginatedJson = (endPoint, pages) => {
  let dataArray = new Array(pages); //can hardcode info.pages

  for (let i = 0; i < pages; i++) {
    dataArray[i] = httpService.get(endPoint + "/?page=" + (i + 1));
  }

  return dataArray;
};

export const resolvePaginatedJson = dataArray => {
  const resolvedDataArray = dataArray.map(d => d.data.results);
  return _.flatten(resolvedDataArray);
};
