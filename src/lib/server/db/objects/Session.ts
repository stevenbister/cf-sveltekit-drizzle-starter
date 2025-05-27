import type { DbClient } from '../connection';
import { session as sessionTable } from '../schema/session';
import { TableCommon } from './TableCommon';

export class Session extends TableCommon<typeof sessionTable> {
	constructor(db: DbClient) {
		super(db, sessionTable);
	}
}
