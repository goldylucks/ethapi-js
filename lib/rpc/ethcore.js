import { inAddress, inData, inNumber } from '../util/format';

export default class Ethcore {
  constructor (transport) {
    this._transport = transport;
  }

  extraData () {
    return this._transport
      .execute('ethcore_extraData');
  }

  gasFloorTarget () {
    return this._transport
      .execute('ethcore_gasFloorTarget');
  }

  minGasPrice () {
    return this._transport
      .execute('ethcore_minGasPrice');
  }

  netChain () {
    return this._transport
      .execute('ethcore_netChain');
  }

  netMaxPeers () {
    return this._transport
      .execute('ethcore_netMaxPeers');
  }

  netPort () {
    return this._transport
      .execute('ethcore_netPort');
  }

  nodeName () {
    return this._transport
      .execute('ethcore_nodeName');
  }

  setAuthor (address) {
    return this._transport
      .execute('ethcore_setAuthor', inAddress(address));
  }

  setExtraData (data) {
    return this._transport
      .execute('ethcore_setExtraData', inData(data));
  }

  setGasFloorTarget (quantity) {
    return this._transport
      .execute('ethcore_setGasFloorTarget', inNumber(quantity));
  }

  setMinGasPrice (quantity) {
    return this._transport
      .execute('ethcore_setMinGasPrice', inNumber(quantity));
  }

  setTransactionsLimit (quantity) {
    return this._transport
      .execute('ethcore_setTransactionsLimit', inNumber(quantity));
  }

  transactionsLimit () {
    return this._transport
      .execute('ethcore_transactionsLimit');
  }

  rpcSettings () {
    return this._transport
      .execute('ethcore_rpcSettings');
  }
}
