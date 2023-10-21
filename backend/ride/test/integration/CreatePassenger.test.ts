import CreatePassenger from "../../src/application/usecase/CreatePassenger";

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074"
    };
    const usecase = new CreatePassenger();
    const output = await usecase.execute(input);
    expect(output.passengerId).toBeDefined();
});