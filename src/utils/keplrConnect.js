import { setupWebKeplr, GasPrice } from "cosmwasm";

export const USE_TESTNET = false;

const junoMainnetConfig = {
  chainId: "juno-1",
  rpcEndpoint: "https://rpc-juno.mib.tech:443",
  prefix: "juno",
  gasPrice: GasPrice.fromString("0.003ujuno"),
  feeToken: "ujuno",
};

const junoTestConfig = {
  chainId: "uni-5",
  rpcEndpoint: "https://juno-uni-5.mib.tech:443",
  prefix: "juno",
  gasPrice: GasPrice.fromString("0.03ujunox"),
  feeToken: "ujunox",
};

export const junoConfig = junoMainnetConfig;

export const keplrChainInfo = {
  chainId: "uni-5",
  chainName: "Juno Uni",
  rpc: "https://juno-uni-5.mib.tech",
  rest: "https://lcd.uni.juno.deuslabs.fi:443",
  stakeCurrency: { coinDenom: "JUNOX", coinMinimalDenom: "ujunox", coinDecimals: 6 },
  bip44: { coinType: 118 },
  bech32Config: { bech32PrefixAccAddr: "juno", bech32PrefixAccPub: "junopub", bech32PrefixValAddr: "junovaloper", bech32PrefixValPub: "junovaloperpub", bech32PrefixConsAddr: "junovalcons", bech32PrefixConsPub: "junovalconspub"},
  feeCurrencies: [{ coinDenom: "JUNOX", coinMinimalDenom: "ujunox", coinDecimals: 6 }],
  currencies: [{ coinDenom: "JUNOX", coinMinimalDenom: "ujunox", coinDecimals: 6 }],
  features: ["stargate"],
  gasPriceStep: { low: 0.03, average: 0.05, high: 0.08 },
}

export async function getClient() {
  if (USE_TESTNET) {
    await window.keplr.experimentalSuggestChain(keplrChainInfo)
  }

  return await setupWebKeplr(junoConfig);
}
