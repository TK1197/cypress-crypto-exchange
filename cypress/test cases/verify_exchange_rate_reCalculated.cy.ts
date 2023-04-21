import crypto_exchange from '../integration/keywords/crypto_exchange'

const cryptoexchange = new crypto_exchange()

describe('Test suite 5', function() {

    it('La Coco Crypto - ReCalculate when amount changed', function() {

        cryptoexchange.callWebURL()
        cryptoexchange.calculateCryptoExchangeRate()
    })
})