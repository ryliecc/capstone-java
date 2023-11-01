export default function formatMoney(input: string): string {
    const isNegative = input.startsWith('-');
    const numericString = input.replace(/[^0-9.]/g, '');
    const [dollars, cents] = numericString.split('.');
    const formattedCents = cents ? cents.padEnd(2, '0') : '00';
    const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedMoney = `${formattedDollars}.${formattedCents}`;
    return isNegative ? `-${formattedMoney}` : formattedMoney;
}
