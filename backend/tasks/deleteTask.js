// tasks/deleteTask.js

import { ddb } from "../utils/db.js";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event) => {
    try {
        const taskId = event.pathParameters.taskId;

        await ddb.send(
            new DeleteCommand({
                TableName: "ChefTasks",
                Key: { taskId }
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Task deleted" })
        };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
