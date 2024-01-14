import * as http from "http";
import { URL } from "url";
import { Types } from "mongoose";

export function match(value: string, cases: Record<string, any>) {
  if (cases.hasOwnProperty(value)) {
    return cases[value]();
  } else if (cases.hasOwnProperty("default")) {
    return cases["default"]();
  } else {
    throw new Error("No matching case found and no default case provided");
  }
}

export const buildHeader = (_: Record<string, any>) => {
  return {
    "Content-Type": "application/json",
    ..._,
  };
};

export function replyHttp(
  code: number,
  message: any,
  res: http.ServerResponse,
  data: Record<string, any> | null = null,
  headers: Record<string, any> = {},
) {
  res.writeHead(code, buildHeader(headers));
  res.end(JSON.stringify({ message, data }));
}

export function queryParser(path: string) {
  const parsedUrl = new URL(path);
  const queryString = parsedUrl.search.substring(1);

  const queryParameters: Record<string, any> = {};
  queryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    queryParameters[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return queryParameters;
}

export const catchAsync =
  (fn: (...args: any[]) => any) =>
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    Promise.resolve(fn(req, res)).catch((err) => {
      console.log(err);
      replyHttp(400, "Bad request", res);
    });
  };

export const getFullUrl = (req: http.IncomingMessage) => {
  return "http://" + req.headers.host + req.url;
};

export default async function parseAsyncObjectId(
  id: string,
): Promise<Types.ObjectId> {
  return new Promise((res, rej) => {
    try {
      const objId = new Types.ObjectId(id);
      res(objId);
    } catch (e) {
      rej(e);
    }
  });
}
