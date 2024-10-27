import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Overview from "./publisher/overview"; // Ensure this import path is correct

interface NavProps {
	option: string;
	show_option: React.ReactNode;
}

const Nav: React.FC<NavProps> = ({ option, show_option }) => {
	return (
		<div className="container flex flex-col items-center mt-10">
			<Tabs defaultValue="overview" className="w-full max-w-[1200px]">
				<div className="flex justify-center w-full mb-8">
					<TabsList className="w-[420px] p-2 gap-2 rounded-none">
						<TabsTrigger value="overview" className="font-semibold flex-1">
							Overview
						</TabsTrigger>
						<TabsTrigger value="option" className="font-semibold flex-1">
							{option}
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="overview" className="w-full">
					<Overview />
				</TabsContent>
				<TabsContent value="option" className="w-full">
					{show_option}
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default Nav;
