import React, { useState, useMemo } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Area,
} from "recharts";
import CardSVG from "../../assets/dashboard/cardicon.svg";

interface OverviewCardProps {
	title: string;
	unit: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, unit }) => {
	const [activeOption, setActiveOption] = useState("24H");

	const options = ["24H", "1 WEEK", "1 MONTH", "1 YEAR"];

	const data = useMemo(
		() => ({
			"24H": Array.from({ length: 24 }, (_, i) => ({
				time: `${i}:00`,
				value: Math.random() * 100 + 50,
			})),
			"1 WEEK": Array.from({ length: 7 }, (_, i) => ({
				time: `Day ${i + 1}`,
				value: Math.random() * 100 + 50,
			})),
			"1 MONTH": Array.from({ length: 30 }, (_, i) => ({
				time: `Day ${i + 1}`,
				value: Math.random() * 100 + 50,
			})),
			"1 YEAR": Array.from({ length: 12 }, (_, i) => ({
				time: `Month ${i + 1}`,
				value: Math.random() * 100 + 50,
			})),
		}),
		[]
	);

	const currentData = data[activeOption as keyof typeof data];
	const currentValue = currentData[currentData.length - 1].value.toFixed(2);
	const previousValue = currentData[0].value;
	const percentageChange = (
		((currentData[currentData.length - 1].value - previousValue) /
			previousValue) *
		100
	).toFixed(2);

	return (
		<div className="self-stretch rounded-xl bg-white p-6 shadow-sm border border-[#ECEBD4] text-[#6F5644]">
			<div className="flex border-b pb-2">
				<img src={CardSVG} className="display-inline " />
				<h3 className="text-lg font-semibold m-1 border-gray-200">{title}</h3>
			</div>
			<div className="mt-4 mb-2 ">
				<span className="text-2xl font-bold">{unit}</span>
				{"  "}
				<span className="text-4xl font-bold">{currentValue}</span>
				<span
					className="ml-2 rounded-full px-2 py-1 font-semibold font-medium 
						bg-secondary/10 text-[#6F5644] hover:bg-secondary/20"
				>
					{Number(percentageChange) >= 0 ? "+" : "-"}{" "}
					{Math.abs(Number(percentageChange))}%
				</span>
			</div>
			<div className="h-48 mb-4">
				<ResponsiveContainer width="100%" height="100%" className="text-sm">
					<LineChart data={currentData}>
						<defs>
							<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#6F5644" stopOpacity={0.8} />
								<stop offset="100%" stopColor="#6F5644" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis dataKey="time" />
						<YAxis />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="value"
							stroke="#6F5644"
							fillOpacity={1}
							fill="url(#colorValue)"
						/>
						<Line
							type="monotone"
							dataKey="value"
							stroke="#6F5644"
							strokeWidth={3}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="flex gap-2">
				{options.map((option) => (
					<button
						key={option}
						className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
							activeOption === option
								? "bg-[#6F5644] text-white"
								: "bg-secondary/10 text-[#6F5644] hover:bg-secondary/20"
						}`}
						onClick={() => setActiveOption(option)}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
};

export default OverviewCard;
