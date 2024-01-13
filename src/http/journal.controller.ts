import { JournalService, journalService } from "../core/journal.service";
import * as http from "http";
import { catchAsync, getFullUrl, queryParser, replyHttp } from "../utils";

export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  public createJournal = catchAsync(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method != "POST") {
        replyHttp(404, "Not Found", res, null, {
          "Content-Type": "text/plain",
        });
        return;
      }

      const reqBody = await new Promise<Record<string, any>>((res) => {
        let body = "";
        req.on("data", (chunks) => {
          body += chunks;
        });

        req.on("end", () => {
          res(<Record<string, any>>JSON.parse(body));
        });
      });

      if (reqBody?.content == null) {
        replyHttp(204, "ok", res);
        return;
      }

      const data = await this.journalService.create({
        content: reqBody?.content,
      });

      replyHttp(200, "success", res, data);
    },
  );

  public getJournal = catchAsync(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method != "GET") {
        replyHttp(404, "Not Found", res, null, {
          "Content-Type": "text/plain",
        });

        return;
      }

      const query = queryParser(getFullUrl(req));

      const data = await this.journalService.getById(query.id);

      replyHttp(200, "success", res, data);
    },
  );
  public getAllJournals = catchAsync(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method != "GET") {
        replyHttp(404, "Not Found", res, null, {
          "Content-Type": "text/plain",
        });

        return;
      }

      const data = await this.journalService.getAllJournal();

      replyHttp(200, "success", res, data);
    },
  );
  public editJournal = catchAsync(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method != "PATCH") {
        replyHttp(404, "Not Found", res, null, {
          "Content-Type": "text/plain",
        });

        return;
      }

      const query = queryParser(getFullUrl(req));

      const reqBody = await new Promise<Record<string, any>>((res) => {
        let body = "";
        req.on("data", (chunks) => {
          body += chunks;
        });

        req.on("end", () => {
          res(<Record<string, any>>JSON.parse(body));
        });
      });

      if (reqBody?.content) {
        const data = await this.journalService.updateJournal(query.id, {
          content: reqBody?.content,
        });
        replyHttp(200, "Succesful", res, data);
      } else {
        replyHttp(204, "ok", res);
      }
    },
  );
}

export const journalController = new JournalController(journalService);
