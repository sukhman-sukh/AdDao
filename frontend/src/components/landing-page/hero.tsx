import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import highlight from "@/assets/effects/highlight.png";
import { Button } from "../ui/button";
import { ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from 'ethers';
import React, { useState } from "react";
import daoAbiJson from "./DAOModule.json";

// Load contract ABI
// const daoAbiPath = "../../artifacts/DAOModule#DecentralizedAdPlatform.json";
// const daoAbiJson = JSON.parse(fs.readFileSync(daoAbiPath, "utf8"));
// frontend/src/artifacts

const Hero = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const DAO_CONTRACT_ADDRESS = "0xc020B52FB91365C9cf6B8E324d8b75402FBF78f4";

  
  const gg = async () => {
      if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    // const signer = await provider.getSigner();
  //     // const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  //  const signer = await provider.getSigner();
  //       const address = await signer.getAddress();
  // const signer = await provider.getSigner();
  // console.log("Address:", address);
  // Get the contract instance
  // const AIRDAO_RPC_URL =  "https://network.ambrosus.io/" ; 
  //  const provider = new ethers.JsonRpcProvider(AIRDAO_RPC_URL);
  // try {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: 0x414e }],
  //     });
  //     // setStatus("Switched to AirDAO network");
  //   } catch (switchError) {
  //     // if (switchError.code === 4902) {
  //     //   // This error code indicates that the chain has not been added to MetaMask
  //     //   alert("AirDAO network is not added to MetaMask. Please add it manually.");
  //     // } else {
  //       console.error("Error switching network:", switchError);
  //     // }
  //   }

  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0x414e",
        rpcUrls: ["https://network.ambrosus.io/"],
        chainName: "AirDAO Mainnet",
        nativeCurrency: {
            name: "AirDAO",
            symbol: "AMB",
            decimals: 18
        },
        blockExplorerUrls: ["https://testnet.airdao.io/explorer/"]
    }]
  });

    const signer = await provider.getSigner();
  const daoContract = new ethers.Contract(DAO_CONTRACT_ADDRESS, daoAbiJson.abi, signer);

  // Define parameters for the proposeCampaign function
  const campaignURI = "https://example.com/campaign";
  const minReputation = 500;
  const startTime = Math.floor(Date.now() / 1000);  // Current time in seconds
  const endTime = startTime+86400; // End time 1 day from now
  const budget = 10; // Example budget of 10 Ether
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
  }
}
  const connect = async () => {
    console.log("Connecting wallet...");
    await gg();
    console.log("Connected wallet...");
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      navigate("/onboard")
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <div className="container items-center mt-24">
      {/* Introdcing Aegis */}
      <div className="group rounded-full mb-6 border-2 bg-white text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-50">
        <AnimatedShinyText className="inline-flex items-center justify-center px-8 py-1.5 transition ease-out">
          <span className="text-xl">Introducing Aegis</span>
        </AnimatedShinyText>
      </div>
      {/* Slogan */}
      <div className="w-full text-center flex flex-col gap-4 mb-8">
        <h1 className="text-7xl font-display leading-[1.2]">
          Personalized ads without <br /> the cost of{" "}
          <span className="relative px-2 box-border items-center justify-center inline-flex">
            <img src={highlight} className="absolute -z-10 top-1" /> personal
            privacy
          </span>
        </h1>
        <p className="text-base uppercase text-muted-foreground tracking-wide leading-6">
          Decentralized ad hosting network with advanced <br /> analytics, but
          without evil cookies 🍪
        </p>
      </div>
      {/* Get Started */}
      <Button 
        variant={"expandIcon"}
        Icon={<ArrowRight weight="bold" />}
        iconPlacement="right"
        className="w-64 rounded-xl shadow-button text-2xl " onClick={connect}>
        Get Started
      </Button>
    </div>
  );
};

export default Hero;
