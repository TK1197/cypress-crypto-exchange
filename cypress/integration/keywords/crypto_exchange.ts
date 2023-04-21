///<reference types="Cypress" />
import { stringify } from 'querystring'
import crypto_exchange_objects from '../object_repository/crypto_exchange_objects'

const cryptoExchange_objects = new crypto_exchange_objects()
const dayjs = require('dayjs')
const todaysDate = dayjs().format('MMMM DD, YYYY')
const Timenow12hours = dayjs().format("hh:mm:ss")

let available_crypto: string[] = ['Bitcoin', 'Ethereum', 'Tether', 'Cardano', 'Dogecoin', 'Solana']

class crypto_exchange {

    exchange_rate_of_crypto_swap: any; exchange_rates_of_crypto_buy: any
    api_url: string = 'https://api.coingecko.com/api/v3/simple'

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

        //input value into text field
        cryptoExchange_objects.inputTextField('swap').type('1')
    }

    calculateCryptoExchangeRate() {

        cryptoExchange_objects.inputTextField('swap').type('1')
        cryptoExchange_objects.clickDropdownlist('buy').click()
        cy.scrollTo('top')
        cryptoExchange_objects.verifyDropdownlist('buy', available_crypto[1]).click()
        this.callAPItoCalculateExchangeRate('swap_crypto', available_crypto[0].toLowerCase(), available_crypto[1].toLowerCase())
    }

    reCalculateConversionAmountWhenSwaped() {

        this.calculateCryptoExchangeRate()
        cryptoExchange_objects.inputTextField('swap').clear()
        cryptoExchange_objects.inputTextField('swap').type('1')
        cryptoExchange_objects.clickOnSwapButton().click()
        this.callAPItoCalculateExchangeRate('buy_crypto', available_crypto[0].toLowerCase(), available_crypto[1].toLowerCase())
    }

    callAPItoCalculateExchangeRate(entry: string, cryptoToswap: string, cryptoToBuy: string) {

        //2 API call to get exchange rate for swap & buy crypto
        cy.request({

            method: 'GET', url: this.api_url + `/price?ids=${cryptoToswap}&vs_currencies=usd`

        }).then(function (response) {

            switch (cryptoToswap) {

                case 'bitcoin':

                    this.exchange_rate_of_crypto_swap = response.body.bitcoin.usd
                    break

                case 'ethereum':

                    this.exchange_rate_of_crypto_swap = response.body.ethereum.usd
                    break

                case 'tether':

                    this.exchange_rate_of_crypto_swap = response.body.tether.usd
                    break

                case 'defichain':

                    this.exchange_rate_of_crypto_swap = response.body.defichain.usd
                    break
            }
        })

        cy.request({

            method: 'GET', url: this.api_url + `/price?ids=${cryptoToBuy}&vs_currencies=usd`

        }).then(function (response) {

            switch (cryptoToBuy) {

                case 'bitcoin':

                    this.exchange_rates_of_crypto_buy = response.body.bitcoin.usd
                    break

                case 'ethereum':

                    this.exchange_rates_of_crypto_buy = response.body.ethereum.usd
                    break

                case 'tether':

                    this.exchange_rates_of_crypto_buy = response.body.tether.usd
                    break
            }

            cy.log(cryptoToswap, this.exchange_rate_of_crypto_swap)
            cy.log(cryptoToBuy, this.exchange_rates_of_crypto_buy)

            if (entry == 'swap_crypto') {

                let exchange_rates_of_current_crypto_swap = (this.exchange_rate_of_crypto_swap / this.exchange_rates_of_crypto_buy).toPrecision(4)
                cy.log(exchange_rates_of_current_crypto_swap)

                cryptoExchange_objects.getExchangeRate().then($value => {

                    const textValue = $value.text()
                    expect(textValue).to.equal(exchange_rates_of_current_crypto_swap)
                })

            } else if (entry == 'buy_crypto') {

                let exchange_rates_of_current_crypto_buy = (this.exchange_rates_of_crypto_buy / this.exchange_rate_of_crypto_swap).toPrecision(2)
                cy.log(exchange_rates_of_current_crypto_buy)

                cryptoExchange_objects.getExchangeRate().then($value => {

                    let textValue = $value.text()
                    textValue = parseFloat(textValue).toFixed(3)
                    expect(textValue).to.equal(exchange_rates_of_current_crypto_buy)
                })
            }
        })
    }
}

export default crypto_exchange;