import EthAbi from 'ethabi-js';
import EthApi from '../ethApi';
import { isInstanceOf } from '../util/types';

export default class Contract {
  constructor (eth, abi) {
    if (!isInstanceOf(eth, EthApi)) {
      throw new Error('EthApi needs to be provided to Contract instance');
    } else if (!abi) {
      throw new Error('Object ABI needs to be provided to Contract instance');
    }

    this._eth = eth;
    this._abi = new EthAbi(abi);

    this._constructors = this._abi.constructors.map((cons) => this._bindFunction(cons));
    this._functions = this._abi.functions.map((func) => this._bindFunction(func));
  }

  get address () {
    return this._address;
  }

  get constructors () {
    return this._constructors;
  }

  get events () {
    return this._events;
  }

  get functions () {
    return this._functions;
  }

  get eth () {
    return this._eth;
  }

  get abi () {
    return this._abi;
  }

  at (address) {
    this._address = address;
    return this;
  }

  _encodeOptions (func, options, values) {
    const tokens = this._abi.encodeTokens(func.inputParamTypes(), values);

    options.to = options.to || this._address;
    options.data = `0x${func.encodeCall(tokens)}`;

    return options;
  }

  _bindFunction (func) {
    func.call = (options, values) => {
      return this._eth.eth
        .call(this._encodeOptions(func, options, values))
        .then((encoded) => func.decodeOutput(encoded))
        .then((tokens) => tokens.map((token) => token.value))
        .then((returns) => returns.length === 1 ? returns[0] : returns);
    };

    func.sendTransaction = (options, values) => {
      return this._eth.eth
        .sendTransaction(this._encodeOptions(func, options, values));
    };

    func.estimateGas = (options, values) => {
      return this._eth.eth
        .estimateGas(this._encodeOptions(func, options, values));
    };

    return func;
  }
}
