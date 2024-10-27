import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cardholder } from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import AdSVG from "../../assets/voting/advertisement.svg";
import VoteYes from "@/assets/voting/voteYes.svg";
import VoteNo from "@/assets/voting/voteNo.svg";
import Header from "@/assets/onboarding/header.svg";

interface OverviewCardProps {
  title: string;
  unit: string;
  description: string[];
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  unit,
  description,
}) => {
  const options = ["VOTE PENDING", "VOTED YES", "VOTED NO"];

  const activeOption = useMemo(() => {
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  const initialVoteStatus =
    activeOption === "VOTE PENDING"
      ? "PENDING"
      : activeOption === "VOTED YES"
      ? "YES"
      : "NO";
  const [voteStatus, setVoteStatus] = useState<"PENDING" | "YES" | "NO">(
    initialVoteStatus
  );

  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  console.log(voteStatus);

  const data = useMemo(() => {
    return [
      { category: "PENDING", value: Math.floor(Math.random() * 100) },
      { category: "YES", value: Math.floor(Math.random() * 100) },
      { category: "NO", value: Math.floor(Math.random() * 100) },
    ];
  }, []);

  const totalValue = parseFloat((Math.random() * 999 + 1).toFixed(3));

  const handleConfirm = () => {
    if (selectedService === "voteYes") {
      setVoteStatus("YES");
    } else if (selectedService === "voteNo") {
      setVoteStatus("NO");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="self-stretch rounded-xl bg-white p-6 shadow-sm border border-[#ECEBD4] text-[#6F5644]">
        <div className="flex border-b pb-2">
          <img
            src={AdSVG}
            className="display-inline"
            alt="Advertisement icon"
          />
          <h3 className="text-lg font-semibold m-1 border-gray-200">{title}</h3>
          {voteStatus === "PENDING" && (
            <DialogTrigger asChild>
              <Button className="rounded-full ml-3 px-3 py-1 text-sm font-medium transition-colors bg-[#6F5644] text-white hover:bg-[#6e5f54]">
                VOTE NOW
              </Button>
            </DialogTrigger>
          )}
          <DialogContent className="rounded-none space-y-2 w-full">
            <CardHeader>
              <img
                src={Header}
                className="h-[8rem] w-full object-cover object-top z-10"
                alt="header"
              />
              <CardTitle className="font-display">
                Cast Your Vote for {title}
              </CardTitle>
              <div className="flex gap-2">
                {description.map((desc) => (
                  <button
                    key={desc}
                    className={
                      "rounded-full px-3 py-1.5 text-sm font-medium transition-colors bg-secondary/10 text-[#6F5644] hover:bg-secondary/20"
                    }
                    disabled={true}
                  >
                    {desc}
                  </button>
                ))}
              </div>
              <div className="flex-row">
                <a
                  href="https://google.co.in"
                  target="_blank"
                  className="text-muted-foreground w-[28ch] leading-5 inline hover:underline"
                >
                  Redirect link
                </a>
                <a
                  href="https://google.co.in"
                  target="_blank"
                  className="text-muted-foreground w-[28ch] leading-5 inline mx-10 hover:underline"
                >
                  Image link
                </a>
              </div>
            </CardHeader>
            <CardContent className="flex flex-row gap-3">
              <ServiceCard
                illustration={VoteYes}
                onClick={() => setSelectedService("voteYes")}
                isSelected={selectedService === "voteYes"}
              />
              <ServiceCard
                illustration={VoteNo}
                onClick={() => setSelectedService("voteNo")}
                isSelected={selectedService === "voteNo"}
              />
            </CardContent>
            <Button
              onClick={handleConfirm}
              className="w-full mt-6 rounded-xl shadow-button text-center text-lg"
            >
              <Cardholder className="w-6 h-6 mr-2" />
              Confirm
            </Button>
          </DialogContent>
        </div>
        <div className="mt-4 mb-2">
          <span className="text-2xl font-bold">{unit}</span>
          {"  "}
          <span className="text-4xl font-bold">{totalValue}</span>
        </div>
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%" className="text-sm">
            <BarChart data={data}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6F5644" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-2">
          <Button
            className="rounded-full px-3 py-1.5 text-sm font-medium bg-secondary/10 text-[#6F5644]"
            disabled={true}
          >
            {voteStatus === "PENDING"
              ? activeOption
              : `VOTED ${voteStatus === "YES" ? "YES" : "NO"}`}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

interface ServiceCardProps {
  title?: string;
  description?: string;
  illustration: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const ServiceCard = (props: ServiceCardProps) => {
  return (
    <div
      className={`
        rounded-xl flex-1 p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:cursor-pointer w-5/12
        ${props.isSelected && "border-primary -translate-y-1.5 shadow-lg"}
      `}
      onClick={props.onClick}
    >
      <img
        src={props.illustration}
        className="object-cover w-full"
        alt="advertiser"
      />
    </div>
  );
};

export default OverviewCard;
