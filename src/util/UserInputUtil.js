export function isUserInputPriceInvalid(input) {
    const convertedAmount = Number(input);
    return (
        isNaN(convertedAmount) ||
        input.slice(-1) === "." ||
        doesValueHaveMoreThanTwoDecimals(input) ||
        convertedAmount < 0
    );
}

function doesValueHaveMoreThanTwoDecimals(str) {
    if (str.includes(".")) {
        return str.split(".")[1].length > 2;
    }

    return false;
}

export const amountErrorMessage =
    "Amount entered must be a non-negative, valid price.";
