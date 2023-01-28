function printShare(share, index)
{
    console.log(`${index} ${share.symbol}:${share.shares}`);
}

/*
   2.1 A stock portfolio is represented by a collection of stock ticker symbols and 
   their corresponding number of shares owned by the portfolio. A portfolio is always 
   created with an empty number of shares (and no ticker symbols in it).
*/
function createPortfolio(symbol, shares)
{
    const portfolio = 
    [
        {
            symbol: symbol,
            shares: shares,
        }
    ];

    return portfolio;
}
exports.createPortfolio = createPortfolio;

/*
    2.2 The stock portfolio shall answer whether it is empty (no shares owned).
*/
function isEmpty(portfolio)
{
    var empty = true;

    portfolio.forEach((element) => {
        if(element.shares > 0)
            empty = false;
        else
            empty = true;
    });

    return empty;
}
exports.isEmpty = isEmpty;


/*
    2.3 The stock portfolio shall answer its count of unique ticker symbols. 
    For instance, at a given time, I can have in my portfolio 5 shares of "GME" which 
    is the Game Stop ticker symbol, and 10 shares of "RBLX" which is the Roblox ticker 
    symbol. For this item, the answer should be 2 as I own two stocks (even though I 
    have multiple shares of those stocks).
*/
function uniqueSymbols(portfolio)
{
    var count = 0;
    portfolio.forEach((element) => 
    {
        if(element.symbol != '' && element.symbol != null)
            count++;
    });

    return count;
}
exports.uniqueSymbols = uniqueSymbols;

/*
    2.4 Make a purchase. Given a symbol and # of shares, the portfolio should be updated 
    accordingly (add shares to a symbol). Don't need to deal with money. Just assume money 
    is infinite for purchases and sales.
*/
function makePurchace(portfolio, symbol, amount)
{
    var inPortfolio = false;
    portfolio.forEach((element) => 
    {
        if(element.symbol === symbol)
        {
            element.shares += amount;
            inPortfolio = true;
        }
    });

    if(inPortfolio == false)
        portfolio.push({symbol: symbol, shares: amount});

    return portfolio;
}
exports.makePurchace = makePurchace;

/*
    2.5 Make a sale. Given a symbol and # of shares, the portfolio should be updated 
    accordingly (subtract shares from a symbol)
*/
function makeSale(portfolio, symbol, amount)
{
    var inPortfolio = false;
    shareSaleException(portfolio, symbol, amount);
    portfolio.forEach((element) => 
    {
        if(element.symbol === symbol)
        {
            element.shares -= amount;
            inPortfolio = true;
        }
    });

    if(inPortfolio == false)
        throw new Error('Share does not exist.');

    return portfolio;
}
exports.makeSale = makeSale;

/*
    2.6 The stock portfolio shall answer how many shares exist for a given symbol.
*/
function numShares(portfolio, symbol)
{
    var shares = 0;
    portfolio.forEach((element) => 
    {
        // console.log(`symbol: ${element.symbol}`);
        if(element.symbol === symbol)
            shares = element.shares;
            // return element.shares;  // why does this not work?
    });

    return shares;
}
exports.numShares = numShares;

/*
    2.7 The portfolio should keep only owned symbols. If symbols are in the 
    portfolio, that means at least one stock should be owned.
*/
function deleteNoShares(portfolio)
{
    for(var i = 0; i < portfolio.length; i++)
    {
        if(portfolio[i].shares === 0)
        {
            portfolio.splice(i, 1);
            i--;
        }
    }

    return portfolio;
}
exports.deleteNoShares = deleteNoShares;

/*
    2.8 It should not be possible to sell too many shares. Raise an exception 
    (named ShareSaleException) when attempting to sell more shares than actually owned by the portfolio.
*/
function shareSaleException(portfolio, symbol, amount)
{
    for(var i = 0; i < portfolio.length; i++)
    {
        if(portfolio[i].symbol === symbol)
            if(portfolio[i].shares < amount)
                return new Error('ShareSaleException');
    }

    return null;
}
exports.shareSaleException = shareSaleException;