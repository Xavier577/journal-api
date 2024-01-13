import http from "http";
import { getFullUrl, match, replyHttp } from "./utils";
import "dotenv/config";
import * as mongoose from "mongoose";
import { journalController } from "./http/journal.controller";

const server = http.createServer((req, res) => {
  try {
    const baseURL = getFullUrl(req);
    const parsedUrl = new URL(baseURL);
    const pathname = parsedUrl.pathname;
    console.log(`hit: ${req.url}`);

    match(pathname, {
      "/api/journal": () => journalController.getJournal(req, res),
      "/api/journal/edit": () => journalController.editJournal(req, res),
      "/api/journal/create": () => journalController.createJournal(req, res),
      "/api/journal/all": () => journalController.getAllJournals(req, res),
      "/": () => replyHttp(200, "PING", res),
    });
  } catch (e) {
    replyHttp(404, "Not Found", res, null, { "Content-Type": "text/plain" });
  }
});

// The server listens on port 3000
server.listen(process.env.PORT, () => {
  mongoose.connect(<string>process.env.MONGO_URI).then(() => {
    console.log(`=================================`);
    console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.log(`🚀 App listening on the port ${process.env.PORT}`);
    console.log(`======= Connected to MongoDB ====`);
    console.log(`=================================`);
  });
});
