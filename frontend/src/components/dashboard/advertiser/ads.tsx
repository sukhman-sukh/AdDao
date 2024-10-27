import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import NewAdDialog from "./newAdDialog";
interface Ad {
	id: string;
	url: string;
	name: string;
}

const YourAds: React.FC = () => {
	const [ads, setAds] = useState<Ad[]>([
		{ id: "1", url: "www.example.com", name: "amazon ad" },
		{ id: "2", url: "www.example2.com", name: "mega" },
		{ id: "3", url: "www.example3.com", name: "sale ad" },
		{ id: "4", url: "www.example4.com", name: "jumbo ad" },
		{ id: "5", url: "www.example5.com", name: "flipkart ad" },
	]);

	const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
	const [tier, setTier] = useState("Gold");
	const [discordLink, setDiscordLink] = useState("");
	
	// const handleDiscordClick = () => {
		
	// };

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

	const handleDiscordClick = () => {
		const tier = "gold";
		if (tier === "gold") {
			setDiscordLink("https://discord.gg/3ryjMaD3");
		}
		else if (tier === "silver") {
			setDiscordLink("https://discord.gg/YzkrXM2V");
		}
		else if (tier === "bronze") {
			setDiscordLink("https://discord.gg/SPjN23Xc");
		}
		else if (tier === "platinum") {
			setDiscordLink("https://discord.gg/DFKqEBjS");
		} else {
			setDiscordLink("Sorry! No server for you");
	
		}
		window.open(discordLink, "_blank"); 
	  };	

	const handleAdClick = (ad: Ad) => {
		setSelectedAd(ad);
	};

	const handleDeleteAd = (adId: string) => {
		setAds(ads.filter((ad) => ad.id !== adId));
		if (selectedAd && selectedAd.id === adId) {
			setSelectedAd(null);
		}
	};

  return (
	<div>
    <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#FAF9F4] p-4 border-r border-[#ECEBD4]">
        <div className="space-y-2 mb-4 text-black">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`p-2 rounded-lg cursor-pointer ${
                selectedAd?.id === ad.id ? "bg-[#D9D8C8]" : "hover:bg-[#EAE9D9]"
              }`}
              onClick={() => handleAdClick(ad)}
            >
              <span className="truncate">{ad.name}</span>
            </div>
          ))}
        </div>
        <NewAdDialog />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {selectedAd ? (
          <div>
            <div className="flex items-center justify-between mb-4 text-black">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#6F5644] rounded-2xl mr-4"></div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedAd.name}</h2>
                  <p className="text-sm text-gray-600">Attached Link - {selectedAd.url}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteAd(selectedAd.id)}
                className="text-red-500 hover:bg-red-100"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Ad
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select an ad to view details
          </div>
        )}
      </div>
    </div>
	<div className="mt-14 bg-[#FAF9F4] p-4  border border-[#ECEBD4] rounded-lg shadow-lg ">
		<div className="flex items-center justify-between">
		<h3 className="text-lg font-semibold text-black">Join Your Token based Community's Discord</h3>
		<div className={`flex items-center font-bold border-2 border rounded-lg px-2 py-1 ${getTierStyle(tier)}`}>
			<span className="text-sm mr-2">Tier:</span>
			<span className="text-sm">{tier}</span>
		</div>
		<button
			className="flex items-center bg-[#5865F2] text-white px-4 py-2 rounded-lg hover:bg-[#4c59e1]"
			onClick={handleDiscordClick}
		>
			<FaDiscord className="mr-3 w-5 h-5" /> Get Invite Link
		</button>
	</div>
	</div>
	</div>
  );
};

export default YourAds;
