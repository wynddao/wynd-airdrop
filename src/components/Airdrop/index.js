// React
import React, { useState, useEffect } from "react";

// MUI
import {
  Grid,
  Box,
  CircularProgress,
  Button,
  Alert,
  Typography,
} from "@mui/material";

// Other Components
import Countdown from "../Countdown";
import ProgressBar from "@ramonak/react-progress-bar";

// Utils
import { getClient, junoConfig, USE_TESTNET } from "../../utils/keplrConnect";
import { hasClaimed, contracts, getMerkleProof, addTokenToKeplr } from "../../utils/wynd";
import { CosmWasmClient } from "cosmwasm";

// Wen airdrop?
// May 29th, use to test app before it goes live
// const AIRDROP_START = 1653816800000;

// Real dates - June 6th 12:00 UTC to Aug 31st 12:00 UTC
const AIRDROP_START = 1654516800000;
const AIRDROP_END = 1661947200000;

/**
 * Airdrop Component
 */
const Airdrop = () => {
  const [client, setClient] = useState(null); // Signing CosmWasm Client
  const [userAddress, setUserAddress] = useState(null); // User Wallet Address
  const [totalClaimed, setTotalClaimed] = useState(0); // Total Claimed in this airdrop stage
  const [error, setError] = useState(null); // Error?
  const [success, setSuccess] = useState(null); // Success?
  const [claiming, setClaiming] = useState(false); // Loading yes/no
  const [claimData, setClaimData] = useState({}); // Merkle Claim Data

  // Airdrop file
  const airdrop_data = USE_TESTNET
    ? require(`../../data/sorted_airdrop_testnet.json`)
    : require(`../../data/sorted_airdrop.json`);

  // Airdrop started?
  const airdrop_started = new Date().getTime() > AIRDROP_START;
  const airdrop_ended = new Date().getTime() > AIRDROP_END;

  /**
   * Connect Wallet & Check eligibility
   */
  const handleConnect = async () => {
    setClaiming(true);
    try {
      const c = await getClient();
      setClient(c);
      const { address } = (await c.signer.getAccounts())[0];
      setUserAddress(address);
      const proofs = airdrop_data.entries;
      console.log(`Loaded ${proofs.length} entries`);
      console.log(`Looking for ${address}`);

      const cd = proofs.find((el) => el.address === address);

      if (!cd) {
        setError(
          "You're not eligible to claim WYND Tokens. Please try another address."
        );
      } else if (await hasClaimed(c, address)) {
        setError("You already claimed your tokens!");
      } else {
        setClaimData(cd);
        setError(false);
      }
    } catch (e) {
      setError(e.message);
    }
    setClaiming(false);
  };

  /**
   * Claim if eligible
   */
  const handleClaim = async () => {
    if (!claimData) {
      setError(
        "This address is not eligible. Try connecting another address from Keplr"
      );
    } else {
      try {
        setClaiming(true);
        await addTokenToKeplr();
        const msg = {
          claim: {
            amount: claimData.amount.toString(),
            proof: getMerkleProof(airdrop_data, userAddress),
            stage: 1,
          },
        };

        console.log(msg);

        const data = await client.execute(
          userAddress,
          contracts.airdropAddr,
          msg,
          {
            gas: "250000",
            amount: [{ denom: "ujunox", amount: "250000" }],
          }
        );

        if (data.logs.length > 0) {
          setError(null);
          setSuccess(
            `Successfully claimed ${
              claimData.amount / 1000000
            } WYND. TX Hash: ${data.transactionHash}`
          );
        } else {
          setError("Unknown error");
        }

        setClaiming(false);
      } catch (e) {
        setClaiming(false);
        setError(e.message);
      }
    }
  };

  /**
   * Load up initial aidrop state
   */
  useEffect(() => {
    async function load() {
      try {
        console.log(junoConfig.rpcEndpoint);
        var client = await CosmWasmClient.connect(junoConfig.rpcEndpoint);
        var data = await client.queryContractSmart(contracts.airdropAddr, {
          total_claimed: { stage: 1 },
        });

        if (data.total_claimed > 0) {
          setTotalClaimed(data.total_claimed / 1000000);
        }
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  return (
    <>
      <Typography variant="h2" sx={{ mt: 2 }}>
        Airdrop will {airdrop_started ? "end" : "start"} in:
      </Typography>
      {!airdrop_ended && (
        <Countdown
          timestampEnd={airdrop_started ? AIRDROP_END : AIRDROP_START}
        />
      )}
      {airdrop_started && (
        <Grid sx={{ mt: 3 }} container>
          <Grid item xs={6}>
            <Typography variant="body2">
              Total claimed: {(totalClaimed / 1000000).toFixed(1)}M $WYND
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ProgressBar
              completed={((100 * totalClaimed) / 108000000).toFixed(2)}
              customLabel=""
            />
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          {claiming && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          {claimData.length}
          {!claiming && Object.keys(claimData).length === 0 && (
            <Button variant="outlined" sx={{ mt: 3 }} onClick={handleConnect}>
              Connect Wallet & Check eligibility
            </Button>
          )}
          {Object.keys(claimData).length > 0 && (
            <>
              <Typography variant="body1" sx={{ textAlign: "left", mt: 3 }}>
                Your account with the address <strong>{userAddress}</strong> is
                eligible for a total of{" "}
                <strong>{claimData.amount / 1000000} $WYND</strong>!
              </Typography>
              {airdrop_started && (
                <Button variant="outlined" onClick={handleClaim}>
                  Claim now!
                </Button>
              )}
            </>
          )}
          {error && (
            <Alert sx={{ mt: 2 }} severity="error">
              {error}
            </Alert>
          )}
          {success && (
            <Alert sx={{ mt: 2 }} severity="success">
              {success}
            </Alert>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Airdrop;
