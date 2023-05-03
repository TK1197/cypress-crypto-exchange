# La Coco Crypto Exchange

This project is about automate La coco crypto exchange using cypress with typescript and page object model framework. 

# Getting Started

In order to clone and run this project please install the necessary tools into your machine. Refer to below prerequisites

# Prerequisites

Ensure the below tools are installed in your machine
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [node](https://nodejs.dev/en/learn/how-to-install-nodejs/)

# Setup

#### 1. Clone this repository into you local env
#### 2. Launch this project using Visual Studio Code
#### 3. Launch terminal and run this command
```
npm install
```
- This will install all the neccessary dependencies based on package.json file.

# Running the Test

**There's few options to execute this test, first options is via terminal in headed / headless mode and the other is via cypress UI console** 

#### **1. Headless mode** 
```
./node_modules/.bin/cypress run 
```

#### **2. Headed mode**
- by default the execution will happens in electron browser. So in order to execute in headed mode you may switch to different browser by simply add this line at end of the node command `--browser <preferred browser name EG: chrome/firefox>`  
```
./node_modules/.bin/cypress run --browser chrome
```

#### **3. Cypress UI console**  

1. Launch Cypress using command 
```
npx cypress open
```
2. Select E2E testing and select chrome/electron as a browser you wants to execute the test and click on start

3. Once you land on specs file page, you may select any of the spec file to execute the runs

## Test scenarios

- `calculate_exchange_rate`

- `validate_crypto_switching_onField`

- `verify_exchange_rate_reCalculated`

- `validate_supported_cryptocurrencies`

- `validate_homepage_compenents`

## Authors

  - **Thiban Kumar** -
    [GitHub](https://github.com/TK1197)
