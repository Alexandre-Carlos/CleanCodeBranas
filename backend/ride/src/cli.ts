import pgp from 'pg-promise';
import crypto from 'crypto';
import { validate } from './CpfValidator';

// driver, primary actor, inbound adapter
process.stdin.on("data", async function(chunk) {
    const command = chunk.toString().replace(/\n/g, "");
    if (command.startsWith("create-passenger")){
        const [name, email, document] = command.replace("create-passenger ", "").split(" ");
        console.log(name, email, document);
        try {
            const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
            const passengerId = crypto.randomUUID();
            if (!validate(document)) throw new Error("Invalid cpf");
            await connection.query("insert into cccat12.passenger (passenger_id, name, email, document) values ($1, $2, $3, $4)", 
                [passengerId, name, email, document]);
            await connection.$pool.end();
        } catch (e:any) {
            console.log(e.message);
        }
    }
});