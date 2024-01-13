export class Journal {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;

    constructor(props: Partial<Journal> = {}) {
        Object.assign(this, props)
    }
}
