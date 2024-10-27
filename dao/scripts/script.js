// // Metadata: {"genericLabels": {}, "reputation": 10"}
// // import React from "react"
// import {ethers} from 'ethers'
// import lighthouse from '@lighthouse-web3/sdk'
// const apiKey = "YOUR_API_KEY"
// const fs = require("fs");
// const daoAbiPath = "../ignition/deployments/chain-16718/artifacts/DAOModule#DecentralizedAdPlatform.json";
// const daoAbiJson = JSON.parse(fs.readFileSync(daoAbiPath, "utf8"));

// const signAuthMessage = async (publicKey, privateKey) => {
//   const provider = new ethers.JsonRpcProvider('**RPC_ENDPOINT**');
//   const signer = new ethers.Wallet(privateKey, provider);
//   const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
//   const signedMessage = await signer.signMessage(messageRequested);
//   return signedMessage;
// };

// const parseMetadata = (metadata) => {
//   const { genericLabels, reputation } = metadata;
//   return { genericLabels, reputation };
// }

// const uploadMetadataToLighthouse = async (genericLabels, reputation, publicKey, privateKey) => {
//   try {
//     const metadata = {"genericLabels": genericLabels, "reputation": reputation}
//     const metadataString = JSON.stringify(metadata);
//     const signedMessage = await signAuthMessage(publicKey, privateKey);
//     const response = await lighthouse.textUploadEncrypted(metadataString, apiKey, publicKey, signedMessage);
//     console.log('Text uploaded successfully:', response);
//     return response;
//   } catch (error) {
//     console.error('Failed to upload encrypted text:', error);
//     throw error;
//   }
// }

// const getMetadataFromLighthouse = async (cid, publicKey, privateKey) => {
//     const signedMessage = await signAuthMessage(publicKey, privateKey)
//     const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
//         cid,
//         publicKey,
//         signedMessage
//     )

//     const decrypted = await lighthouse.decryptFile(
//         cid,
//         fileEncryptionKey.data.key
//     )

//     return JSON.parse(decrypted)
// }


// const AIRDaoSBTContractAddress = "0x544FE2FbC748b628eDbaeaEF6fB3D1575324b0D2"
// const AIRDaoSBTContractABI = []

// const DAOContractAddess = "0xc020B52FB91365C9cf6B8E324d8b75402FBF78f4"
// const DAOContractABI = daoAbiJson.abi


// async function getContract(contractAddress, contractABI) {
//   if (typeof window.ethereum !== 'undefined') {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     return new ethers.Contract(contractAddress, contractABI, signer);
//   }
// }

// async function proposeCampaign(campaignURI, minReputation, startTime, endTime, budget, privateLabel, publicLabel, metadataURI, reputation) {
//   const contract = await getContract(DAOContractAddess, DAOContractABI);
//   console.log("Proposing campaign...",contract);
//   try {
//     const tx = await contract.proposeCampaign(
//       campaignURI,
//       minReputation,
//       startTime,
//       endTime,
//       budget,
//       privateLabel,
//       publicLabel,
//       metadataURI,
//       reputation
//     );
//     await tx.wait();
//     console.log("Campaign proposed successfully");
//   } catch (error) {
//     console.error("Error proposing campaign:", error);
//   }
// }

// async function voteOnCampaign(campaignId, approve) {
//   const contract = await getContract(DAOContractAddess, DAOContractABI);
//   try {
//     const tx = await contract.voteOnCampaign(campaignId, approve);
//     await tx.wait();
//     console.log("Vote cast successfully");
//   } catch (error) {
//     console.error("Error voting on campaign:", error);
//   }
// }

// async function executeVotingResult(campaignId, newMetadataURI) {
//   const contract = await getContract(DAOContractAddess, DAOContractABI);
//   try {
//     const tx = await contract.executeVotingResult(campaignId, newMetadataURI);
//     await tx.wait();
//     console.log("Voting result executed successfully");
//   } catch (error) {
//     console.error("Error executing voting result:", error);
//   }
// }

// async function getVotingResult(campaignId) {
//   const contract = await getContract(DAOContractAddess, DAOContractABI);
//   try {
//     const result = await contract.getVotingResult(campaignId);
//     console.log("Votes For:", result[0].toString());
//     console.log("Votes Against:", result[1].toString());
//     return result;
//   } catch (error) {
//     console.error("Error getting voting result:", error);
//   }
// }

// async function getAdvertiserBenefits(advertiserAddress) {
//   const contract = await getContract(DAOContractAddess, DAOContractABI);
//   try {
//     const benefits = await contract.getAdvertiserBenefits(advertiserAddress);
//     console.log("Discount Percentage:", benefits[0].toString());
//     console.log("Max Campaigns:", benefits[1].toString());
//     return benefits;
//   } catch (error) {
//     console.error("Error getting advertiser benefits:", error);
//   }
// }

// (async () => {
//   await proposeCampaign("1", 1, 1, 1, 1, "1", "1", "1", 1);
// })();

require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

// Load contract ABI
const daoAbiPath = "../ignition/deployments/chain-16718/artifacts/DAOModule#DecentralizedAdPlatform.json";
const daoAbiJson = JSON.parse(fs.readFileSync(daoAbiPath, "utf8"));

// Replace with actual values
// const RPC_ENDPOINT = "YOUR_RPC_ENDPOINT";
const DAO_CONTRACT_ADDRESS = "0xc020B52FB91365C9cf6B8E324d8b75402FBF78f4";

const main = async () => {
  // Set up provider and wallet
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  }
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  
  // Get the contract instance
  const daoContract = new ethers.Contract(DAO_CONTRACT_ADDRESS, daoAbiJson.abi, wallet);

  // Define parameters for the proposeCampaign function
  const campaignURI = "https://example.com/campaign";
  const minReputation = 500;
  const startTime = Math.floor(Date.now() / 1000);  // Current time in seconds
  const endTime = startTime + 86400; // End time 1 day from now
  const budget = ethers.utils.parseEther("10"); // Example budget of 10 Ether
  const privateLabel = "Private Campaign Label";
  const publicLabel = "Public Campaign Label";
  const metadataURI = "https://example.com/metadata";
  const reputation = 1000;

  try {
    console.log("Proposing campaign...");
    const tx = await daoContract.proposeCampaign(
      campaignURI,
      minReputation,
      startTime,
      endTime,
      budget,
      privateLabel,
      publicLabel,
      metadataURI,
      reputation
    );

    console.log("Transaction submitted, waiting for confirmation...");
    await tx.wait();
    console.log("Campaign proposed successfully, transaction hash:", tx.hash);
  } catch (error) {
    console.error("Error proposing campaign:", error);
  }
};

// Run the script
main().catch(console.error);
