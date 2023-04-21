import crypto_exchange from '../integration/keywords/crypto_exchange'

const cryptoexchange = new crypto_exchange()

describe('Test suite 2', function() {

    it('La Coco Crypto Exchange Homepage', function() {

        cryptoexchange.callWebURL()
        cryptoexchange.validateSupportedCryptoCurrency()
    })
})