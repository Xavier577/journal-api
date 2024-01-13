import { JournalModel } from "../models/journal";
import { Journal } from "./journal.entity";

type AsyncReturn<T> = Promise<T | null | undefined>;

export class JournalService {
  constructor(private readonly journalModel: typeof JournalModel) {}

  public async getById(id: string): AsyncReturn<Journal> {
    const journal = await this.journalModel.findById(id);

    if (journal == null) return;

    return new Journal({ ...journal, id: journal._id.toString() });
  }

  public async create(data: Pick<Journal, "content">) {
    const journal = await this.journalModel.create({ content: data.content });

    return new Journal({ ...journal, id: journal._id.toString() });
  }

  public async getAllJournal(): Promise<Journal[]> {
    const journals = await this.journalModel.find();

    if (journals.length < 1) return [];

    return journals?.map((j) => new Journal({ ...j, id: j._id.toString() }));
  }

  public async updateJournal(
    id: string,
    data: Partial<Pick<Journal, "content">>,
  ): AsyncReturn<Journal> {
    const journal = await this.journalModel.findByIdAndUpdate(id, { content: data?.content }, { new: true});

    if (journal == null) return

    return new Journal({ ...journal, id: journal._id.toString()})
  }
}

export const journalService = new JournalService(JournalModel);
