# ethapi-js

A thin, fast low-level Promise-based wrapper around the Eth APIs.

[![Build Status](https://travis-ci.org/jacogr/ethapi-js.svg?branch=master)](https://travis-ci.org/jacogr/ethapi-js)
[![Coverage Status](https://coveralls.io/repos/github/jacogr/ethapi-js/badge.svg?branch=master)](https://coveralls.io/github/jacogr/ethapi-js?branch=master)
[![Dependency Status](https://david-dm.org/jacogr/ethapi-js.svg)](https://david-dm.org/jacogr/ethapi-js)
[![devDependency Status](https://david-dm.org/jacogr/ethapi-js/dev-status.svg)](https://david-dm.org/jacogr/ethapi-js#info=devDependencies)

## getting going

- clone
- `npm install`
- `npm run testOnce`

## usage

### initialisation

```
// import the actual EthApi class
import EthApi from 'ethapi-js';

// do the setup
const transport = new EthApi.Transports.JsonRpc('127.0.0.1', 8545);
const ethapi = new EthApi(transport);
```

You will require native Promises and fetch, they can be utilised by

```
import 'isomorphic-fetch';

import es6Promise from 'es6-promise';
es6Promise.polyfill();
```

### making calls

```
// perform a call
ethapi.eth
  .coinbase()
  .then((coinbase) => {
    console.log(`The coinbase is ${coinbase}`);
  });

// multiple promises
Promise
  .all([
    ethapi.eth.coinbase(),
    ethapi.net.listening()
  ])
  .then(([coinbase, listening]) => {
    // do stuff here
  });

// chaining promises
ethapi.eth
  .newFilter({...})
  .then((filterId) => getFilterChanges(filterId))
  .then((changes) => {
    console.log(changes);
  });
```

## apis

For a list of the exposed APIs, along with their parameters, the following exist. These implement the calls as listed on the official [JSON Ethereum RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) definition.

### ethapi.eth.<...>

In most cases, the interfaces maps through to the RPC `eth_<interface>` definition.

- `accounts()` - returns a list of accounts associated with the current running instance
- `blockNumber()` - returns the current blockNumber
- `call(options, blockNumber = 'latest')` - performs a call
- `coinbase()` - returns the current coinbase (base account) for the running instance
- `compile[LLL|Serpent|Solidity](code)` - compiles the supplied code using the required compiler
- `estimateGas(options)` - performs a *fake* call using the options, returning the used gas
- `gasPrice()` - returns the current gas price
- `getBalance(address, blockNumber = 'latest')` - returns the current address balance as at blockNumber
- `getBlockByHash(hash, full = false)` - gets the block by the specified hash
- `getBlockByNumber(blockNumber = 'latest', full = false)` - gets the block by blockNumber
- `getBlockTransactionCountByHash(hash)` - transaction count in specified hash
- `getBlockTransactionCountByNumber(blockNumber = 'latest')` - transaction count by blockNumber
- `getCode(address, blockNumber = 'latest')` - get the deployed code at address
- `getCompilers()` - get a list of the available compilers
- `getFilterChanges(filterId)` - returns the changes to a specified filterId
- `getFilterLogs(filterId)` - returns the logs for a specified filterId
- `getLogs(options)` - returns logs
- `getStorageAt(address, index = 0, blockNumber = 'latest')` - retrieve the store at address
- `getTransactionByBlockHashAndIndex(hash, index = 0)`
- `getTransactionByBlockNumberAndIndex(blockNumber = 'latest', index = 0)`
- `getTransactionByHash(hash)`
- `getTransactionCount(address, blockNumber = 'latest')`
- `getTransactionReceipt(txhash)`
- `getUncleByBlockHashAndIndex(hash, index = 0)`
- `getUncleByBlockNumberAndIndex(blockNumber = 'latest', index = 0)`
- `getUncleCountByBlockHash(hash)`
- `getUncleCountByBlockNumber(blockNumber = 'latest')`
- `getWork()`
- `hashrate()`
- `mining()`
- `newBlockFilter()`
- `newFilter(options)`
- `newPendingTransactionFilter()`
- `protocolVersion()`
- `sendRawTransaction(data)`
- `sendTransaction(options)`
- `sign()`
- `submitHashrate(hashrate, clientId)`
- `submitWork(nonce, powHash, mixDigest)`
- `syncing()`
- `uninstallFilter(filterId)`

*TODO* complete the descriptions where not available

### ethapi.net.<...>

- `listening()` - returns the listening status of the network
- `peerCount()` - returns the number of connected peers
- `version()` - returns the network version

### ethapi.personal.<...>

- `listAccounts()` - list all the available accounts
- `newAccount(password)` - creates a new account
- `unlockAccount(account, password, duration = 5)` - unlocks the account

### ethapi.shh.<...>

- `addToGroup(identity)`
- `getFilterChanges(filterId)`
- `getMessages(filterId)`
- `hasIdentity(identity)`
- `newFilter(options)`
- `newGroup()`
- `newIdentity()`
- `post(options)`
- `uninstallFilter(filterId)`
- `version()`

*TODO* complete the descriptions where not available

### ethapi.web3.<...>

- `clientVersion()` - returns the version of the RPC client
- `sha3(hexStr)` - returns a keccak256 of the hexStr input
