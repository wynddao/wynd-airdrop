import { MerkleTree } from "merkletreejs";
import sha256 from "crypto-js/sha256";
import { junoConfig, USE_TESTNET } from "./keplrConnect";

// mainnet
// export const codes = {
//   cw20_vesting: 333,
//   cw20_vesting_airdrop: 334,
// };

const mainnetContracts = {
  tokenAddr: "juno1mkw83sv6c7sjdvsaplrzc8yaes9l42p4mhy0ssuxjnyzl87c9eps7ce3m9",
  airdropAddr:
    "juno1v99ehkuetkpf0yxdry8ce92yeqaeaa7lyxr2aagkesrw67wcsn8qxpxay0",
  stage: 1,
};

const testnetContracts = {
  tokenAddr: "TODO",
  airdropAddr: "TODO",
  stage: 1,
};

export const contracts = USE_TESTNET ? testnetContracts : mainnetContracts;

export const getBalance = async (client, address) => {
  return await client.queryContractSmart(contracts.tokenAddr, {
    balance: { address },
  });
};

export const getMerkleProof = (airdrop_data, address, slow) => {
  const { entries, prefixes, chunk } = airdrop_data;
  const index = entries.findIndex((x) => x.address === address);
  if (index < 0) {
    throw new Error(`Address ${address} not found`);
  }
  if (slow) {
    return slowProof(index, entries);
  } else {
    return quickProof(index, entries, prefixes, chunk);
  }
};

export const hasClaimed = async (client, address) => {
  const { is_claimed } = await client.queryContractSmart(
    contracts.airdropAddr,
    {
      is_claimed: {
        stage: 1,
        address: address,
      },
    }
  );
  return is_claimed;
};

export const addTokenToKeplr = async () => {
  return window.keplr.suggestToken(
    junoConfig.chainId,
    contracts.tokenAddr
  );
};

const leafHash = (entry) => sha256(entry.address + entry.amount).toString();

// sometimes the end of the proof and the begining of prefix overlap by 1 or more (at the right end)
// we need to remove this so proofs work
function combineWithoutOverlap(proof, prefix) {
  // find if there is any overlap
  const lastProof = proof[proof.length - 1];
  let match = prefix.findIndex((x) => x === lastProof);
  // remove the last few from the prefix, as we have those in proof
  if (match >= 0) {
    return [...proof, ...prefix.slice(match + 1)];
  }
  return [...proof, ...prefix];
}

function quickProof(index, entries, prefixes, chunk) {
  const time = Date.now();
  const start = index - (index % chunk);
  const end = start + chunk;
  const pos = start / chunk;

  const leaves = entries.slice(start, end).map(leafHash);
  const tree = new MerkleTree(leaves, sha256, { sort: true });
  const proof = tree
    .getHexProof(leafHash(entries[index]))
    .map((v) => v.replace("0x", ""));
  const combined = combineWithoutOverlap(proof, prefixes[pos]);

  // if there is a duplicate, remove it
  console.log(`>>> Quickproof in ${Date.now() - time} ms`);
  return combined;
}

function slowProof(index, entries) {
  const leaves = entries.map(leafHash);
  const tree = new MerkleTree(leaves, sha256, { sort: true });
  const proof = tree
    .getHexProof(leafHash(entries[index]))
    .map((v) => v.replace("0x", ""));
  return proof;
}
