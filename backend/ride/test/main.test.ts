import axios from "axios";

test("Deve fazer o cáculo do preço de uma corrida", async function (){
    // given, when, then
    // arrange, act, assert
    //given
    const input = [
        { dist: 10, ds: "2021-03-01T10:00:00Z"}
    ];
    //when
    const response = await axios.post("http://localhost:3000/calc", input);
    const output = response.data;
    //then
    expect(output.result).toBe(21);

});