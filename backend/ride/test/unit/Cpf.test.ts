import Cpf from "../../src/domain/Cpf";

test.each([
    "83432616074",
    "74587887803",
    "87175659520"
])("Deve testar os cpfs válidos com o primeiro digito verificador diferente de zero", function(value: string) {
    const cpf = new Cpf(value);
    expect(cpf.value).toBe(value);
});

test.each([
    "83432616076",
    "99999999999",
    "834326160",
    ""
])("deve testar os cpfs inválidos", function(cpf: string) {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
});