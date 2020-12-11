const formatCurrency = inp => {
    return "$" + Number(inp.toFixed(2)).toLocaleString() + " ";
}

export default formatCurrency;