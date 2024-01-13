import mongoose from "mongoose";
import {Journal} from "../core/journal.entity";

const journalSchema = new mongoose.Schema<Journal>(
    {
        content: String
    },
    {
        timestamps: true,
    }
);

export const JournalModel = mongoose.model('journal', journalSchema);
