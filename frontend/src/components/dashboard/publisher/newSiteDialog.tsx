import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeaderImage from "@/assets/onboarding/header.svg";
import NewSiteIcon from "@/assets/dashboard/newsite.svg";

const PublishWebsiteDialog = () => {
	const [open, setOpen] = useState(false);
	const [url, setUrl] = useState("");


	const handlePublish = () => {
		console.log("Publishing website:", { url });
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="w-full bg-[#EAE9D9] text-[#6F5644] hover:bg-[#D9D8C8] text-seminbold"
				>
					<div className="text-[#6F5644] flex items-center justify-center space-x-2">
						<img src={NewSiteIcon} className="w-5 h-5" alt="Add Site" />
						<span>Add a new site</span>
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
					<h2 className="text-2xl font-semibold mb-2">Publish a new website</h2>
					<p className="text-sm text-gray-600 mb-4">
						Help us embed ads on your sites by providing following details
					</p>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="url"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Your site URL
							</label>
							<Input
								id="url"
								placeholder="www.example.com"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>
						<Button
							className="w-full bg-[#6F5644] text-white hover:bg-[#5A4536]"
							onClick={handlePublish}
						>
							Publish the website
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default PublishWebsiteDialog;
