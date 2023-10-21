import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";

test("Deve cadastrar o motorista", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA999"
    };
    const usecase = new CreateDriver();
    const output = await usecase.execute(input);
    expect(output.driverId).toBeDefined();
});

test("Deve obter o motorista", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const usecase1 = new CreateDriver();
    const output1 = await usecase1.execute(input);
    const usecase2 = new GetDriver();
    const output2 = await usecase2.execute( {driverId: output1.driverId} );

    expect(output2.name).toBe("Jhon Doe");
    expect(output2.email).toBe("jhon.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    expect(output2.carPlate).toBe("AAA9999");
});