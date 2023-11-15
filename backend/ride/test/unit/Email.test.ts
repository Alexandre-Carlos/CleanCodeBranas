import Email from "../../src/domain/Email";

test("Deve validar o email", function (){
    const email = new Email("john.doe@gmail.com");
    expect(email).toBeTruthy();
});

test("Não deve validar o email inválido", function() {
    expect(() => new Email("john.doe@gmail")).toThrow(new Error("Invalid email"));
})