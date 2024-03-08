using db as db from '../db/schema';
service MyService {
    @odata.draft.enabled
    entity task as projection on db.task;
}