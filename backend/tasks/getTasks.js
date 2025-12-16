// tasks/getTasks.js

import { ddb } from "../utils/db.js";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async () => {
    try {
        const result = await ddb.send(
            new ScanCommand({
                TableName: "ChefTasks"
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify(result.Items)
        };

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
