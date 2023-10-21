import CreatePassenger from './application/usecase/CreatePassenger';

// driver, primary actor, inbound adapter
process.stdin.on("data", async function(chunk) {
    const command = chunk.toString().replace(/\n/g, "");
    if (command.startsWith("create-passenger")){
        try {
            const [name, email, document] = command.replace("create-passenger ", "").split(" ");
            console.log(name, email, document);
           const usecase = new CreatePassenger();
           const output = await usecase.execute({ name, email, document});
           console.log(output);
        } catch (e:any) {
            console.log(e.message);
        }
    }
});