import { app } from "./app";

import { connectToDatabase } from "./database";

connectToDatabase();

app.listen(3001, () => console.log("Server started at: http://localhost:3001"));
