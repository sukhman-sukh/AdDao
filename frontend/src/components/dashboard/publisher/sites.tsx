import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import SiteDialog from "./newSiteDialog";

interface Site {
	id: string;
	url: string;
	totalAds: number;
}

const YourSites: React.FC = () => {
	const [sites, setSites] = useState<Site[]>([
		{ id: "1", url: "www.example.com", totalAds: 8 },
		{ id: "2", url: "www.example2.com", totalAds: 5 },
		{ id: "3", url: "www.example3.com", totalAds: 12 },
		{ id: "4", url: "www.example4.com", totalAds: 3 },
		{ id: "5", url: "www.example5.com", totalAds: 7 },
	]);

	const [selectedSite, setSelectedSite] = useState<Site | null>(null);

	const handleSiteClick = (site: Site) => {
		setSelectedSite(site);
	};

	const handleDeleteSite = (siteId: string) => {
		setSites(sites.filter((site) => site.id !== siteId));
		if (selectedSite && selectedSite.id === siteId) {
			setSelectedSite(null);
		}
	};

	return (
		<div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
			{/* Left sidebar */}
			<div className="w-64 bg-[#FAF9F4] p-4 border-r border-[#ECEBD4]">
				<h2 className="text-[#6F5644] text-xl font-semibold mb-4">Your Sites</h2>
				<div className="space-y-2 mb-4">
					{sites.map((site) => (
						<div
							key={site.id}
							className={`text-[#6F5644] p-2 rounded-lg cursor-pointer ${
								selectedSite?.id === site.id
									? "bg-[#D9D8C8]"
									: "hover:bg-[#EAE9D9]"
							}`}
							onClick={() => handleSiteClick(site)}
						>
							<span className="truncate">{site.url}</span>
						</div>
					))}
				</div>
				<SiteDialog />
			</div>

			<div className="flex-1 p-6">text-gray-500
				{selectedSite ? (
					<div>
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center">
								<div className="w-12 h-12 bg-[#6F5644] rounded-2xl mr-4"></div>
								<div>
									<h2 className="text-xl font-semibold">{selectedSite.url}</h2>
									<p className=" text-sm text-gray-600">
										Total Ads on this website - {selectedSite.totalAds}
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => handleDeleteSite(selectedSite.id)}
								className="text-red-500 hover:bg-red-100"
							>
								<Trash2 className="h-5 w-5 mr-2" />
								Delete Site
							</Button>
						</div>
					</div>
				) : (
					<div className="text-[#6F5644] flex items-center justify-center h-full text-gray-500">
						Select a site to view details
					</div>
				)}
			</div>
		</div>
	);
};

export default YourSites;
