import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import HeaderImage from "@/assets/onboarding/header.svg";
import NewAdIcon from "@/assets/dashboard/newsite.svg";
import { ethers } from 'ethers';
import daoAbiJson from "./DAOModule.json";
const AddNewAdDialog = () => {
	const getTier = () => {
		return "Gold"; 
	};

	const [open, setOpen] = useState(false);
	const [adName, setAdName] = useState("");
	const [link, setLink] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [budget, setBudget] = useState("");
	const [categories, setCategories] = useState<string[]>([]);
	const [newCategory, setNewCategory] = useState("");
	const [tier, setTier] = useState(getTier());
	const handleAddCategory = () => {
		if (newCategory.trim() !== "") {
			setCategories([...categories, newCategory.trim()]);
			setNewCategory("");
		}
	};

	const handleRemoveCategory = (category: string) => {
		setCategories(categories.filter((c) => c !== category));
	};

	const getDiscount = () => {
		switch (tier) {
			case "Bronze":
			return "5";  // 5% discount for Bronze tier
			case "Silver":
			return "10";  // 10% discount for Silver tier
			case "Gold":
			return "15";  // 15% discount for Gold tier
			case "Platinum":
			return "20";  // 20% discount for Platinum tier
			default:
			return "0";  // Default discount if no tier is selected
		}
	}

	const getTierStyle = (tier:any) => {
		switch (tier) {
			case "Bronze":
			return "border-[#cd7f32] text-[#cd7f32]";  // Bronze color
			case "Silver":
			return "border-gray-400 text-gray-400";  // Silver color
			case "Gold":
			return "border-[#FFD700] text-[#FFD700]";  // Gold color
			case "Platinum":
			return "border-[#e5e4e2] text-[#e5e4e2]";  // Platinum color
			default:
			return "border-gray-600 text-gray-600";  // Default color if no tier is selected
		}
	};

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
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
	if (chainId !== 0x414e) {
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
		}

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
	const overrides = {
		// gasLimit: ethers.hexlify(1000), 
		gasPrice: ethers.parseUnits("8000", "gwei") 
	};
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
      reputation,
	  overrides
    );

    console.log("Transaction submitted, waiting for confirmation...");
    await tx.wait();
    console.log("Campaign proposed successfully, transaction hash:", tx.hash);
  } catch (error) {
    console.error("Error proposing campaign:", error);
  }
  }
}

	const handlePublish = () => {
		console.log("Publishing ad:", {
			adName,
			link,
			imageUrl,
			budget,
			categories,
		});
		gg();

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="w-full bg-[#EAE9D9] text-[#6F5644] hover:bg-[#D9D8C8] text-semibold"
				>
					<div className="flex items-center justify-center space-x-2 text-black">
						<img src={NewAdIcon} className="w-5 h-5" alt="Add Ad" />
						<span>Add a new ad</span>
					</div>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] p-0">
				<div className="relative">
					<img
						src={HeaderImage}
						className="h-[14rem] w-full object-cover object-top"
						alt="header"
					/>
					<Button
						variant="ghost"
						className="absolute top-2 left-2 text-primary bg-white h-6 p-2 rounded-full"
						onClick={() => setOpen(false)}
					>
						← Go back
					</Button>
				</div>
				<div className="p-6">
					<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold mb-2">Advertise your new ad</h2>

					<div className={`flex items-center border rounded-lg px-2 py-1 ${getTierStyle(tier)}`}>
						<span className="text-sm mr-2">Tier:</span>
						<span className="text-sm">{tier}</span>
					</div>
				</div>
					<div className="space-y-1">
						{/* Other input fields remain the same */}
						<div>
							<label
								htmlFor="adName"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Your ad name
							</label>
							<Input
								id="adName"
								placeholder="Amazon Ad"
								value={adName}
								onChange={(e) => setAdName(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="link"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Attached link
							</label>
							<Input
								id="link"
								placeholder="www.amazon.in"
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="imageUrl"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Ad image URL
							</label>
							<Input
								id="imageUrl"
								placeholder="https://example.com/ad-image.jpg"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</div>
						<div>
							<label
								htmlFor="Discount"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Discount Based on tier
							</label>
							<div className="flex items-center">
								
								<Input
									id="discount"
									placeholder={getDiscount()}
									value={getDiscount()}
									readOnly
								/>
								<span className="mr-2">%</span>
							</div>
						</div>
						<div>
							<label
								htmlFor="budget"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Maximum advertisement budget
							</label>
							<div className="flex items-center">
								<span className="mr-2">AMB</span>
								<Input
									id="budget"
									placeholder="0.0067"
									value={budget}
									onChange={(e) => setBudget(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Enter relevant categories
							</label>
							<div className="flex items-center mb-2">
								<Input
									placeholder="Like: Technology"
									value={newCategory}
									onChange={(e) => setNewCategory(e.target.value)}
									className="mr-2"
								/>
								<Button variant="outline" size="sm" onClick={handleAddCategory}>
									Add this topic
								</Button>
							</div>
							<div className="text-[#6F5644] flex flex-wrap gap-2 mt-2">
								{categories.map((category, index) => (
									<div
										key={index}
										className="flex items-center bg-gray-100 rounded-full px-3 py-1"
									>
										<span className="mr-2">{category}</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleRemoveCategory(category)}
											className="p-0 h-auto"
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								))}
							</div>
						</div>
						<Button
							className="w-full bg-[#6F5644] text-white hover:bg-[#5A4536]"
							onClick={handlePublish}
						>
							Advertise this ad
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddNewAdDialog;
