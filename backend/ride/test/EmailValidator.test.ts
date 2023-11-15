import { validate } from "../src/EmailValidator";

test("Deve validar o email", function (){
    const email = "john.doe@gmail.com";
    const isValid = validate(email);
    expect(isValid).toBeTruthy();
});

test("Não deve validar o email inválido", function() {
    const email = "john.doe@gmail.com";
    const isValid = validate(email);
    expect(isValid).toBeFalsy();
})