import crypto_exchange from '../integration/keywords/crypto_exchange'

const cryptoexchange = new crypto_exchange()

describe('Test suite', function() {

    it('La Coco Crypto Exchange Homepage', function() {

        cryptoexchange.callWebURL()
    })
})