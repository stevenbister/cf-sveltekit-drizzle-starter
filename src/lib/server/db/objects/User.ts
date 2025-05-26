import { eq } from 'drizzle-orm';
import type { DbClient } from '../connection';
import { user } from '../schema/user';
import { TableCommon } from './TableCommon';

export class User extends TableCommon<typeof user> {
	constructor(db: DbClient) {
		super(db, user);
	}

	getByEmail(email: string) {
		return this.db.select().from(this.schema).where(eq(this.schema.email, email));
	}
}
