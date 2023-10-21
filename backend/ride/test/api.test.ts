import axios from "axios";
axios.defaults.validateStatus = function(){
    return true;
};

test("Deve fazer o cáculo do preço de uma corrida durante o dia", async function (){
    // given, when, then
    // arrange, act, assert
    //given
    const input = { 
        segments: [
            { distance: 10, date: "2021-03-01T10:00:00"}
        ]
    };
    //when
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    const output = response.data;
    //then
    expect(output.price).toBe(21);
});

test("Se a distância for inválida deve lançar um erro", async function (){
    const input = { 
        segments: [
            { distance: -10, date: "2021-03-01T10:00:00"}
        ]
    };
    const response = await axios.post("http://localhost:3000/calculate_ride", input);
    expect(response.data.price).toBe(-1);
});

test("Deve cadastrar o passageiro", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@email.com",
        document: "83432616074"
    };
    const response1 = await axios.post("http://localhost:3000/passengers", input);
    const output1 = response1.data;
    expect(output1.passengerId).toBeDefined();
});

test("Não deve obter o passageiro com cpf inválido", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616076"
    };
    const response = await axios.post("http://localhost:3000/passengers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid cpf");

    //await expect(() => axios.post("http://localhost:3000/passengers", input)).rejects.toThrow(new Error("Invalid cpf"));
});

test("Deve obter o passageiro", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@email.com",
        document: "83432616074"
    };
    const response1 = await axios.post("http://localhost:3000/passengers", input);
    const output1 = response1.data;

    const response2 = await axios.get(`http://localhost:3000/passengers/${output1.passengerId}`);
    const output2 = response2.data;
    expect(output2.name).toBe("Jhon Doe");
    expect(output2.email).toBe("jhon.doe@email.com")
    expect(output2.document).toBe("83432616074")
});

test("Deve cadastrar o motorista", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@email.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const response1 = await axios.post("http://localhost:3000/drivers", input);
    const output1 = response1.data;
    expect(output1.driverId).toBeDefined();
});

test("Deve obter o motorista", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616074",
        carPlate: "AAA9999"
    };
    const response1 = await axios.post("http://localhost:3000/drivers", input);
    const output1 = response1.data;
    const response2 = await axios.get(`http://localhost:3000/drivers/${output1.driverId}`);
    const output2 = response2.data;
    expect(output2.name).toBe("Jhon Doe");
    expect(output2.email).toBe("jhon.doe@gmail.com");
    expect(output2.document).toBe("83432616074");
    expect(output2.carPlate).toBe("AAA9999");
});

test("Não deve cadastrar o motorista com cpf inválido", async function () {
    const input = {
        name: "Jhon Doe",
        email: "jhon.doe@gmail.com",
        document: "83432616076",
        carPlate: "AAA9999"
    };
    const response = await axios.post("http://localhost:3000/drivers", input);
    expect(response.status).toBe(422);
    const output = response.data;
    expect(output).toBe("Invalid cpf");
});