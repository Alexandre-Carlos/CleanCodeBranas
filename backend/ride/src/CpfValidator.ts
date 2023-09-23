function clean(cpf: string) {
    return cpf.replace(/\D/g, "");
}

function isValidLength(cpf: string){
    return cpf.length !== 11;
}

function hasAllDigitsEqual(cpf: string){
    return cpf.split("").every(c => c === cpf[0]);
}

function extractCheckDigit(cpf: string){
    return cpf.substring(cpf.length-2, cpf.length);
}

export function validate (cpf: string) {
    cpf = clean(cpf);
    if (isValidLength(cpf)) return false;
    if (hasAllDigitsEqual(cpf)) return false;
    let d1 = 0;
    let d2 = 0;
    for (let nCount = 1; nCount < cpf.length -1; nCount++) {
        const digito = parseInt(cpf.substring(nCount -1, nCount));  							
        d1 = d1 + ( 11 - nCount ) * digito;  
        d2 = d2 + ( 12 - nCount ) * digito;  
    };
    let rest = (d1 % 11);  
    let dg1 = (rest < 2) ? 0 : 11 - rest;  
    d2 += 2 * dg1;  
    rest = (d2 % 11);  
    let dg2 = (rest < 2)  ? 0 : 11 - rest;  
    return extractCheckDigit(cpf) == `${dg1}${dg2}`;
}