// tasks/updateTask.js

import { ddb } from "../utils/db.js";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event) => {
    try {
        const taskId = event.pathParameters.taskId;
        const body = JSON.parse(event.body);

        await ddb.send(
            new UpdateCommand({
                TableName: "ChefTasks",
                Key: { taskId },
                UpdateExpression: "set #title=:t, #desc=:d, #status=:s",
                ExpressionAttributeNames: {
                    "#title": "title",
                    "#desc": "description",
                    "#status": "status"
                },
                ExpressionAttributeValues: {
                    ":t": body.title,
                    ":d": body.description,
                    ":s": body.status
                }
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Task updated" })
        };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
