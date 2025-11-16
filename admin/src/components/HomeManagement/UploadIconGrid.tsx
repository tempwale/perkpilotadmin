import { type ReactElement } from "react";
import UploadIcon from "./UploadIcon";

export default function UploadIconGrid(): ReactElement{
  return (
    <div className="w-full flex flex-row gap-4">
      <UploadIcon />
      <UploadIcon />
    </div>
  );
}
