import type { DbClient } from '../connection';
import { session } from '../schema/session';
import { Query } from './Query';

export class SessionQuery extends Query<typeof session> {
	constructor(db: DbClient) {
		super(db, session);
	}
}
