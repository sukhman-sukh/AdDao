import React from "react";
import { useEffect, useState } from "react";
import OverviewCard from "./card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { ListenOptions } from "net";
import { ethers } from 'ethers';

interface CardData {
	title: string;
	unit: string;
	description: Array<string>;
}

const Overview: React.FC = () => {
	const [userAddress, setUserAddress] = useState<string>("");
	const cardData: CardData[] = [
		{ title: "Woodland Ad", unit: "DAO", description: ["tag1", "tag2", "tag3"] },
		{ title: "Nike Ad", unit: "DAO", description: ["tag2", "tag3", "tag4"] },
		{ title: "Adidas Ad", unit: "DAO", description: ["tag1", "tag2", "tag4"] },
		{ title: "Google Ad", unit: "DAO", description: ["tag1", "tag2", "tag5"] },
		{ title: "Apple Ad", unit: "DAO", description: ["tag1", "tag2", "tag6"] },
		{ title: "HP Ad", unit: "DAO", description: ["tag1", "tag2", "tag7"] },
	];

	const getAddress = async () => {
		let userAddress = "";
		if (typeof window.ethereum !== 'undefined') {
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			const provider = new ethers.BrowserProvider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			const signer = await provider.getSigner();
			 userAddress = await signer.getAddress();
		}
		return userAddress
	}
	useEffect(() => {
		const fetchAddress = async () => {
		const address = await getAddress();
		setUserAddress(address);
		};

		fetchAddress();
	}, []); 

	const truncateAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<div className="w-[1200px] bg-white p-8 rounded-lg shadow-lg">
			<div className="flex justify-between items-center mb-8">
				<div className="flex items-center">
					<div className="w-12 h-12 bg-primary rounded-2xl mr-4"></div>
					<div>
						<h1 className="text-gray-600 text-xl font-display ">Welcome Sukhman,</h1>
						<p className="text-gray-600 text-primary text-base">
							Vote on the agendas for the week
						</p>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex flex-col items-end mr-2">
						<span className="text-sm text-gray-600">
							{truncateAddress(userAddress)}
						</span>
						<span className="text-xs text-gray-500">Balance : 50 AMB</span>
					</div>
					<Button variant="ghost" size="icon" className="h-8 w-8">
						<Copy className="h-4 w-4" />
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-3 grid-rows-2 gap-8">
				{cardData.map((card, index) => (
					<OverviewCard key={index} title={card.title} unit={card.unit} description={card.description} />
				))}
			</div>
		</div>
	);
};

export default Overview;
