import { eq } from "drizzle-orm";
import { task } from "../db/schema";
import { Database } from "../db";

export class Tasks {
  readonly db = Database.getInstance();

  async getById(taskId: string) {
		const [result] = await this.db.select().from(task).where(eq(task.id, taskId)).limit(1);

		return result;
  }

  async getAll() {
    const result = await this.db.select().from(task);

    return result;
  }
}
