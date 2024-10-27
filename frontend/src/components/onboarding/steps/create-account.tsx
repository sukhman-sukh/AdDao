import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Cardholder } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';

interface CreateAccountProps {
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
}

const CreateAccount = (props: CreateAccountProps) => {
  // const AIRDAO_NETWORK_PARAMS = {
  //   chainId: '0x414e',
  //   chainName: 'AirDAO Mainnet',
  //   nativeCurrency: {
  //     name: 'AMB',
  //     symbol: 'AMB',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://network.ambrosus.io'],
  //   blockExplorerUrls: ['https://explorer.ambrosus.io/'],
  // };
  const navigate = useNavigate();
  const handleConnect = async () => {

  // if (window.ethereum) {
  // // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const provider = new ethers. .providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  if (typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
     await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();
    const  chainId = await provider.getNetwork();
    const message = `Sign this message to verify your address: ${userAddress} `;
    const userSignature = await signer.signMessage(message);

    console.log("User signed message:", userSignature, chainId);

        
  }       
  // TODO: wallet connect + next step
  console.log("Connecting wallet...");
  props.setCurrentStepIndex(props.currentStepIndex + 1);
  };
  return (
    <Card className="rounded-none space-y-5 ">
      <CardHeader>
        <CardTitle className="font-display">Create your account</CardTitle>
        <CardDescription>
          Help us create your account by choosing an available username and
          connecting your wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Label htmlFor="username">Your username</Label>
				<Input id="username" placeholder="Enter your username here" /> */}
        <Button
          onClick={handleConnect}
          className="w-full mt-0 rounded-xl shadow-button text-center text-lg"
        >     
          <Cardholder className="w-6 h-6 mr-2" /> Connect Wallet
        </Button>
      </CardContent>
      <Separator />
      <div className="mt-3 text-center">
        <Label htmlFor="voting">Here to vote? </Label>
        <Label
          className="underline cursor-pointer"
          onClick={() => navigate("/vote")}
        >
          Create a profile
        </Label>
      </div>
    </Card>
  );
} ;

export default CreateAccount;
