import { FC } from "react";

const tagBg = {
  nákup: "bg-red-700",
  potraviny: "bg-orange-700",
  programování: "bg-lime-600",
  komunikace: "bg-green-600",
  práce: "bg-sky-600",
  domácnost: "bg-violet-600",
  prezentace: "bg-blue-700",
};

const tagText = {
  nákup: "text-red-700",
  potraviny: "text-orange-700",
  programování: "text-lime-700",
  komunikace: "text-green-600",
  práce: "text-sky-600",
  domácnost: "text-violet-600",
  prezentace: "text-blue-700",
};

interface Props {
  tag: String;
}

export const Tag: FC<Props> = ({ tag }) => {
  const tagTextColor = tagText[tag as keyof typeof tagText];
  const tagBgColor = tagBg[tag as keyof typeof tagBg];

  return (
    <div
      className={`p-2 text-xs font-bold capitalize ${tagTextColor} 
      ${tagBgColor} bg-opacity-50 rounded-md`}
    >
      {tag}
    </div>
  );
};
