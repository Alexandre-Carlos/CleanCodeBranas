import axios from "axios";

test("Deve fazer o cáculo do preço de uma corrida durante o dia", async function (){
    // given, when, then
    // arrange, act, assert
    //given
    const input = [
        { dist: 10, ds: "2021-03-01T10:00:00"}
    ];
    //when
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    //then
    expect(output.result).toBe(21);
});

test("Deve fazer o cáculo do preço de uma corrida durante a noite", async function (){
    const input = [
        { dist: 10, ds: "2021-03-01T23:00:00"}
    ];
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    expect(output.result).toBe(39);
});

test("Deve fazer o cáculo do preço de uma corrida no domingo de dia", async function (){
    const input = [
        { dist: 10, ds: "2021-03-07T10:00:00"}
    ];
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    expect(output.result).toBe(29);
});

test("Deve fazer o cáculo do preço de uma corrida no domingo de noite", async function (){
    const input = [
        { dist: 10, ds: "2021-03-07T23:00:00"}
    ];
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    expect(output.result).toBe(50);
});

test("Deve retornar -1 se a distancia for inválida", async function (){
    const input = [
        { dist: -10, ds: "2021-03-07T23:00:00"}
    ];
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    expect(output.result).toBe(-1);
});

test("Deve retornar -2 se a data for inválida", async function (){
    const input = [
        { dist: 10, ds: "javascript"}
    ];
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    expect(output.result).toBe(-2);
});