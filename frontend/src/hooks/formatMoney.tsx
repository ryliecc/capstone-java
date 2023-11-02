export default function formatMoney(input: string): string {
    const isNegative = input.startsWith('-');
    const numericString = input.replace(/[^0-9.]/g, '');
    const [dollars, cents] = numericString.split('.');
    const formattedCents = cents ? cents.padEnd(2, '0') : '00';

    // Add commas as thousands separators
    const formattedDollars = addThousandsSeparator(dollars);

    const formattedMoney = `${formattedDollars}.${formattedCents}`;
    return isNegative ? `-${formattedMoney}` : formattedMoney;
}

function addThousandsSeparator(input: string): string {
    const parts = input.split('.');
    const integerPart = parts[0];
    const fractionalPart = parts[1] || '';
    const reversedIntegerPart = integerPart.split('').reverse().join('');
    const formattedIntegerPart = reversedIntegerPart.replace(/\d{3}(?=\d)/g, (match) => `${match},`);
    const finalFormattedIntegerPart = formattedIntegerPart.split('').reverse().join('');
    return finalFormattedIntegerPart + (fractionalPart ? `.${fractionalPart}` : '');
}
