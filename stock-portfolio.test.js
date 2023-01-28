const myFunctions = require('./stock-portfolio.js');

// Test 2.1
test('Testing createPortfolio -- success', () => {
    const target = myFunctions.createPortfolio('GME', 2);
    const result = 
    [
        {
            symbol: 'GME',
            shares: 2,
        }
    ];
    expect(target).toEqual(result);
});

// Test 2.2
test('Testing isEmpty -- fail', () => {
    const portfolio = myFunctions.createPortfolio('GME', 1);;
    const target = myFunctions.isEmpty(portfolio);
    const result = false;
    expect(target).toBe(result);
});

// Test 2.2
test('Testing isEmpty -- success', () => {
    const portfolio = myFunctions.createPortfolio('', 0);
    const target = myFunctions.isEmpty(portfolio);
    const result = true;
    expect(target).toBe(result);
});

// Test 2.3
test('Testing uniqueSymbols -- success', () => {
    const portfolio = 
    [
        {
            symbol: 'GME',
            shares: 5,
        },
        {
            symbol: 'RBLX',
            shares: 10,
        },
        {
            symbol: '',
            shares: 0,
        },
    ];
    const target = myFunctions.uniqueSymbols(portfolio);
    const result = 2;
    expect(target).toBe(result);
});

// Test 2.4
test('Testing makePurchace -- success', () => {
    const portfolio = myFunctions.createPortfolio('GME', 5);
    const target = myFunctions.makePurchace(portfolio, 'RBLX', 10);
    const result = 
    [
        {
            symbol: 'GME',
            shares: 5,
        },
        {
            symbol: 'RBLX',
            shares: 10,
        },
    ];
    expect(target).toEqual(result);
});

// Test 2.5
test('Testing makeSale -- success', () => 
{
    const portfolio = myFunctions.createPortfolio('GME', 5);
    const target = myFunctions.makeSale(portfolio, 'GME', 3);
    const result = myFunctions.createPortfolio('GME', 2);
    expect(target).toEqual(result);
});

// Test 2.6
test('Testing numShares -- success', () => 
{
    const portfolio = myFunctions.createPortfolio('GME', 2);
    const target = myFunctions.numShares(portfolio, 'GME');
    const result = 2;
    expect(target).toEqual(result);
});

// Test 2.7
test('Testing deleteNoShares -- success', () => 
{
    const portfolio = 
    [
        {
            symbol: 'GME',
            shares: 2,
        },
        {
            symbol: 'RBLX',
            shares: 0,
        },
        {
            symbol: 'BTC',
            shares: 0,
        },
    ];
    const target = myFunctions.deleteNoShares(portfolio);
    const result = myFunctions.createPortfolio('GME', 2);
    expect(target).toEqual(result);
});

// Test 2.8
test('Testing shareSaleException -- success', () => 
{
    const portfolio = 
    [
        {
            symbol: 'GME',
            shares: 2,
        },
    ];
    const target = myFunctions.shareSaleException(portfolio, 'GME', 3);
    const result = new Error('ShareSaleException');
    expect(target).toEqual(result);
});

