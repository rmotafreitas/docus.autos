import { Link } from "react-router-dom";

interface Props {
  features: String[];
  Icon: any;
  url: string;
  title: string;
  i: number;
}

import { useEffect, useRef } from "react";

export function FeatureCard({ title, features, Icon, url, i }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={cardRef}
      to={url}
      className="bg-muted rounded-lg p-4 flex flex-col gap-4 max-w-xs hover:bg-muted-hover transition-color duration-300 ease-in-out cursor-pointer"
      style={{
        animationDelay: `${i * 0.1}s`,
        animationDuration: "0.5s",
      }}
    >
      <div className="flex justify-start items-center gap-4">
        <div className="flex justify-center items-center text-center bg-primary rounded-md p-2  bg-gradient-to-r from-[#5350F6] to-[#E662FE]">
          <Icon className="text-xl" />
        </div>
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>
      <ul className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <li key={index} className="leading-relaxed">
            <p>
              <span className="font-semibold"> &bull; </span>
              {feature}
            </p>
          </li>
        ))}
      </ul>
    </Link>
  );
}
