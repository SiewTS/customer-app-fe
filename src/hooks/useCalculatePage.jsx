export const useCalculatePage = ({totalAmount, amountPerPage}) => {
    const amount = amountPerPage ?? 10
    if(totalAmount <= amount) return 1
    return Math.ceil(totalAmount/amount);
}