import PassengerRepositoryDataBase from "../../src/application/infra/repository/PassengerRepositoryDatabase";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074"
    };
    const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
    const output = await usecase.execute(input);
    expect(output.passengerId).toBeDefined();
});

test("Não deve cadastrar o passageiro com email inválido", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail",
        document: "83432616074"
    };
    const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
    await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid email"));
});

test("Deve obter o passageiro", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@email.com",
        document: "83432616074"
    };
    const usecase1 = new CreatePassenger(new PassengerRepositoryDataBase());
    const output1 = await usecase1.execute(input);
    const usecase2 = new GetPassenger(new PassengerRepositoryDataBase());
    const output2 = await usecase2.execute({ passengerId: output1.passengerId });

    expect(output2.name).toBe("Jhon Doe");
    expect(output2.email).toBe("jhon.doe@email.com")
    expect(output2.document).toBe("83432616074")
});