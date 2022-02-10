export function isUserInputPriceInvalid(input: string): boolean {
    const convertedAmount = Number(input);
    return (
        isNaN(convertedAmount) ||
        input.slice(-1) === "." ||
        doesValueHaveMoreThanTwoDecimals(input) ||
        convertedAmount < 0
    );
}

function doesValueHaveMoreThanTwoDecimals(str: string): boolean {
    if (str.includes(".")) {
        return str.split(".")[1].length > 2;
    }

    return false;
}
