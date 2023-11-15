import DriverRepositoryDataBase from "../../src/application/infra/repository/DriverRepositoryDatabase";
import DriverRepository from "../../src/application/infra/repository/DriverRepositoryDatabase";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import sinon from "sinon";

test("Deve cadastrar o motorista", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA999"
    };
    const usecase = new CreateDriver(new DriverRepository());
    const output = await usecase.execute(input);
    expect(output.driverId).toBeDefined();
});

//narrow integration test - não tem dependencia do banco
test("Deve obter o motorista", async function () {
    const driverRepository: DriverRepository = {
        async save (driver: any): Promise<void> {
        },
        async get (driverId: string): Promise<any> {
            return { 
                driver_id: "",
                name: "Jhon Doe",
                email: "jhon.doe@gmail.com",
                document: "83432616074",
                car_plate: "AAA9999"
            }
        }
    };
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    //const stubSave = sinon.stub(DriverRepository.prototype, "save").resolves();
    const usecase1 = new CreateDriver(driverRepository);
    const output1 = await usecase1.execute(input);
    //stubSave.restore();
    /*const stubGet = sinon.stub(DriverRepository.prototype, "get").resolves({
        driver_id: output1.driverId,
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        car_plate: "AAA9999"
    });*/
    const usecase2 = new GetDriver(driverRepository);
    const output2 = await usecase2.execute( {driverId: output1.driverId} );
    //stubGet.restore();
    expect(output2.name).toBe("Jhon Doe");
    expect(output2.email).toBe("jhon.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    expect(output2.carPlate).toBe("AAA9999");
});

//broad integration test - tem dependencia do banco
test("Deve obter o motorista", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const usecase1 = new CreateDriver(new DriverRepositoryDataBase());
    const output1 = await usecase1.execute(input);
    const usecase2 = new GetDriver(new DriverRepositoryDataBase());
    const output2 = await usecase2.execute( {driverId: output1.driverId} );
    expect(output2.name).toBe("Jhon Doe");
    expect(output2.email).toBe("jhon.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    expect(output2.carPlate).toBe("AAA9999");
});