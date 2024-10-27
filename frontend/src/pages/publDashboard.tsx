import Nav from "@/components/dashboard/nav";
import Sites from "../components/dashboard/publisher/sites";

const PublisherDash = () => {
	return (
		<main className="container items-center">
            <Nav option="Your Sites" show_option={<Sites />} />
		</main>
	);
};

export default PublisherDash;
