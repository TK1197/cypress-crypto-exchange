import crypto_exchange from '../integration/keywords/crypto_exchange'

const cryptoexchange = new crypto_exchange()

describe('Test suite 4', function() {

    it('La Coco Crypto Exchange Rate', function() {

        cryptoexchange.callWebURL()
        cryptoexchange.validateBothFieldsAbleSwitchCrypto()
    })
})