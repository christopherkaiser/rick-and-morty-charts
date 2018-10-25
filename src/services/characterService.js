import httpService from "./httpService";

const endPoint = "/character";

export const getCharacter = async id => {
  const { data } = await httpService.get(endPoint + "/" + id);
  return data;
};
