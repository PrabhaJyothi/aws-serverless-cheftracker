// tasks/createTask.js

import { ddb } from "../utils/db.js";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuid } from "uuid";

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const taskId = uuid();

        const item = {
            taskId,
            title: body.title,
            description: body.description,
            dueDate: body.dueDate,
            status: "pending",
            createdAt: new Date().toISOString()
        };

        await ddb.send(new PutCommand({
            TableName: "ChefTasks",
            Item: item
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Task created", item })
        };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
