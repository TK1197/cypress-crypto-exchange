///<reference types="Cypress" />
import crypto_exchange_objects from '../object_repository/crypto_exchange_objects'

const cryptoExchange_objects = new crypto_exchange_objects()
const dayjs = require('dayjs')
const todaysDate = dayjs().format('MMMM DD, YYYY')
const Timenow12hours = dayjs().format("hh:mm:ss")

let available_crypto: string[] = ['Bitcoin', 'Ethereum', 'Tether', 'Cardano', 'Dogecoin', 'Solana']

class crypto_exchange {

    callWebURL() {

        cy.visit(Cypress.env('url'))
    }

    validateHomePageComponent() {

        cryptoExchange_objects.verifyHeader().contains('La Pepe scammer exchange')
        cryptoExchange_objects.verifyText().contains('We love stonk and make monies')
        cryptoExchange_objects.verifySwapLabel().should('have.text', 'btc to swap')
        cryptoExchange_objects.verifyBuyLabel().should('have.text', 'dfi to buy')
        cryptoExchange_objects.verifyExchangeRateText().should('have.text', 'Current exchange rate')
        //cryptoExchange_objects.verifyDescriptionText().should('have.text', `Trusted online crypto exchange. For sure will make your bank account STONK. Powered by Coingecko. ${todaysDate} ${Timenow12hours}`).wait(5)
    }

    validateSupportedCryptoCurrency() {

        //swap dropdown
        cryptoExchange_objects.clickDropdownlist('swap').click()

        for (let i = 0; i < 6; i++) {

            cryptoExchange_objects.verifyDropdownlist('swap', available_crypto[i]).contains(available_crypto[i])
        }

        cryptoExchange_objects.clickDropdownlist('swap').click()

        //buy dropdown
        cryptoExchange_objects.clickDropdownlist('buy').click()

        for (let i = 0; i < 6; i++) {

            available_crypto.shift()
            available_crypto.push('DeFiChain')
            cryptoExchange_objects.verifyDropdownlist('buy', available_crypto[i]).contains(available_crypto[i])
        }
    }

    validateBothFieldsAbleSwitchCrypto() {

        //swap field
        cryptoExchange_objects.clickDropdownlist('swap').click()
        cryptoExchange_objects.verifyDropdownlist('swap', available_crypto[1]).click()
        cryptoExchange_objects.verifySwapLabel().should('have.text', 'eth to swap')

        //buy field
        cryptoExchange_objects.clickDropdownlist('buy').click()
        cryptoExchange_objects.verifyDropdownlist('buy', available_crypto[5]).click()
        cryptoExchange_objects.verifyBuyLabel().should('have.text', 'sol to buy')
    }

    calculateCryptoExchangeRate() {

        cryptoExchange_objects.inputTextField('swap').type('1500')
        cryptoExchange_objects.clickDropdownlist('buy').click()
        cy.scrollTo('top')
        cryptoExchange_objects.verifyDropdownlist('buy', available_crypto[1]).click()
        this.callAPItoCalculateExchangeRate('swap_crypto', available_crypto[1].toLowerCase(), available_crypto[2].toLowerCase())
    }

    reCalculateConversionAmountWhenSwaped() {

        this.calculateCryptoExchangeRate()
        //maybe click on swap button or re-enter amount
        this.callAPItoCalculateExchangeRate('buy crypto', available_crypto[2].toLowerCase(), available_crypto[1].toLowerCase())
    }

    callAPItoCalculateExchangeRate(entry: string, cryptoToswap: string, cryptoToBuy: string) {

        let exchange_rate_of_crypto_swap: any, exchange_rates_of_crypto_buy: any, exchange_rates_of_current_crypto: string

        //API call to get exchange rate for swap crypto
        it('La Coco Swap Crypto Exchange Rate', function() {

            cy.request({

                method: 'GET', url: `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoToswap}&vs_currencies=usd`
    
            }).then(function (response) {

                switch (cryptoToswap) {

                    case 'bitcoin':
    
                        exchange_rate_of_crypto_swap = response.body.bitcoin.usd
                        break
    
                    case 'ethereum':
    
                        exchange_rate_of_crypto_swap = response.body.ethereum.usd
                        break
    
                    case 'Tether':
                        exchange_rate_of_crypto_swap = response.body.Tether.usd
                        break
                }
            })
        })

        //API call to get exchange rate for buy crypto
        it('La Coco Buy Crypto Exchange Rate', function() {

            cy.request({

                method: 'GET', url: `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoToBuy}&vs_currencies=usd`
    
            }).then(function (response) {

                switch (cryptoToBuy) {

                    case 'bitcoin':
    
                        exchange_rates_of_crypto_buy = response.body.bitcoin.usd
                        break
    
                    case 'ethereum':
    
                        exchange_rates_of_crypto_buy = response.body.ethereum.usd
                        break
    
                    case 'Tether':
                        exchange_rates_of_crypto_buy = response.body.Tether.usd
                        break
                }
            })
        })

        if (entry == 'swap_crypto') {

            exchange_rates_of_current_crypto = (exchange_rate_of_crypto_swap / exchange_rates_of_crypto_buy).toPrecision(4)

            cy.get('[data-test-id="hero__headline"]').then($value => {

                const textValue = $value.text()
                expect(textValue.includes(exchange_rates_of_current_crypto)).to.be.true
                //cy.wrap(textValue).as('wrapValue')
            })

        }else if (entry == 'buy_crypto') {

            exchange_rates_of_current_crypto = (exchange_rates_of_crypto_buy / exchange_rate_of_crypto_swap).toPrecision(4)

            cy.get('[data-test-id="hero__headline"]').then($value => {

                const textValue = $value.text()
                expect(textValue.includes(exchange_rates_of_current_crypto)).to.be.true
                //cy.wrap(textValue).as('wrapValue')
            })
        }
    }
}

export default crypto_exchange;