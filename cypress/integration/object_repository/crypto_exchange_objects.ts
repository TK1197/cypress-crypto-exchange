class crypto_exchange_objects{

    verifyHeader(){

        return cy.get('[data-testid="lepepe-company-title"]')
    }

    verifyText(){

        return cy.get('[data-testid="lepepe-company-motto"]')
    }

    verifySwapLabel(){

        return cy.get('[data-testid="swap-label"]')
    }

    verifyBuyLabel(){

        return cy.get('[data-testid="buy-label"]')
    }

    verifyExchangeRateText(){

        return cy.get('.gap-x-4 > .text-cyan-600')
    }

    verifyDescriptionText(){

        return cy.get('.mt-10 > .text-opacity-60')
    }

    clickDropdownlist(text:string){

        return cy.get(`[data-testid="${text}-dropdown"]`)
    }

    verifyDropdownlist(text:string, crypto:string){

        return cy.get(`[data-testid="${text}-dropdown-option-${crypto}"]`)
    }

    inputTextField(text:string){

        return cy.get(`[data-testid="${text}-input"]`)
    }
}

export default crypto_exchange_objects;