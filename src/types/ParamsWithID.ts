import { ParamsDictionary } from 'express-serve-static-core';

interface IDParam {
  id: string;
}

type ParamsWithID<P = ParamsDictionary> = P & IDParam;

export default ParamsWithID;
