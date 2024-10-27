import Nav from "@/components/dashboard/nav";
import Ads from "../components/dashboard/advertiser/ads";

const AdvertDash = () => {
	return (
		<main className="container items-center">
			<Nav option="Your Ads" show_option={<Ads />} />
		</main>
	);
};

export default AdvertDash;
