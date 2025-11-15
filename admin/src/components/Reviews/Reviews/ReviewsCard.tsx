import { useState, type ReactElement } from "react";
import CardPopup from "./CardPopup";

// card-local state is used to control the details modal

function VerificationIcon(): ReactElement{
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9178 5.64301C15.7799 5.42265 15.5767 5.25077 15.3365 5.15129C15.0964 5.05181 14.8311 5.02969 14.5778 5.08801L12.7798 5.50101C12.5955 5.54336 12.4041 5.54336 12.2198 5.50101L10.4218 5.08801C10.1685 5.02969 9.90326 5.05181 9.66308 5.15129C9.42291 5.25077 9.21972 5.42265 9.08181 5.64301L8.10181 7.20701C8.00181 7.36701 7.86681 7.50201 7.70681 7.60301L6.14281 8.58301C5.92283 8.7208 5.7512 8.92366 5.65174 9.16342C5.55229 9.40319 5.52994 9.66797 5.58781 9.92101L6.00081 11.721C6.04301 11.905 6.04301 12.0961 6.00081 12.28L5.58781 14.079C5.52972 14.3322 5.55195 14.5972 5.65142 14.8372C5.75088 15.0771 5.92264 15.2802 6.14281 15.418L7.70681 16.398C7.86681 16.498 8.00181 16.633 8.10281 16.793L9.08281 18.357C9.36481 18.808 9.90281 19.031 10.4218 18.912L12.2198 18.499C12.4041 18.4567 12.5955 18.4567 12.7798 18.499L14.5788 18.912C14.832 18.9701 15.097 18.9479 15.337 18.8484C15.5769 18.7489 15.78 18.5772 15.9178 18.357L16.8978 16.793C16.9978 16.633 17.1328 16.498 17.2928 16.398L18.8578 15.418C19.078 15.28 19.2497 15.0767 19.349 14.8365C19.4483 14.5964 19.4702 14.3312 19.4118 14.078L18.9998 12.28C18.9575 12.0957 18.9575 11.9043 18.9998 11.72L19.4128 9.92101C19.471 9.66792 19.4489 9.403 19.3496 9.16304C19.2504 8.92308 19.0788 8.72 18.8588 8.58201L17.2938 7.60201C17.134 7.50183 16.999 7.36679 16.8988 7.20701L15.9178 5.64301ZM15.4148 9.77001C15.4767 9.65628 15.492 9.52298 15.4576 9.39818C15.4231 9.27338 15.3416 9.16679 15.2302 9.10085C15.1188 9.03491 14.9862 9.01476 14.8602 9.04463C14.7342 9.0745 14.6248 9.15206 14.5548 9.26101L11.9398 13.687L10.3608 12.175C10.314 12.1269 10.2579 12.0887 10.196 12.0628C10.1341 12.0368 10.0676 12.0236 10.0004 12.0239C9.93329 12.0242 9.8669 12.038 9.80522 12.0645C9.74353 12.091 9.68781 12.1296 9.64139 12.1781C9.59497 12.2267 9.55879 12.284 9.53501 12.3468C9.51124 12.4096 9.50035 12.4765 9.503 12.5436C9.50566 12.6107 9.52179 12.6766 9.55045 12.7373C9.57911 12.798 9.6197 12.8523 9.66981 12.897L11.7038 14.846C11.7582 14.8981 11.8237 14.9371 11.8954 14.9603C11.9671 14.9835 12.043 14.9902 12.1177 14.9799C12.1923 14.9697 12.2636 14.9426 12.3263 14.9009C12.389 14.8592 12.4415 14.8039 12.4798 14.739L15.4148 9.77001Z"
        fill="white"
      />
    </svg>
  );
}

interface DealCardProps {
  id: string;
  title?: string;
  category?: string;
  description?: string;
  logoComponent?: React.ReactNode;
  verified?: boolean;
  dealType?: string;
  features?: string[];
  discount?: string;
  savings?: string;
  onViewDetails?: () => void;
  onGetDeal?: () => void;
  onDelete?: () => void;
}

function CheckCircle({ className }: { className?: string }): ReactElement{
  return (
    <div className={className}>
      <VerificationIcon />
    </div>
  );
}

export default function DealCard({
  id,
  title = "Framer",
  category = "No-Code Tool",
  description = "Every communications experience, Integrated contact center, voice, video, chat, and APIs.",
  logoComponent = <div />,
  verified = true,
  dealType = "Hot Deal",
  features = [
    "Unlimited Blocks",
    "Team Collaboration",
    "Advance Permissions",
    "Version History",
  ],
  discount = "25% OFF",
  savings = "Save Up To $1234",
  onViewDetails,
  onGetDeal,
  onDelete,
}: DealCardProps): ReactElement{
  const [showModal, setShowModal] = useState(false);

  const openModal = (): void => {
    setShowModal(true);
  };
  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <div
          data-layer="Frame 2147223651"
          className="Frame2147223651 w-[250px] p-2.5 bg-[#2f2f32] rounded-tl-lg rounded-tr-lg inline-flex justify-center items-center gap-2.5"
        >
          <div
            data-layer="Customize Deal Card?"
            className="CustomizeDealCard justify-start text-neutral-50 text-sm font-medium font-['Plus_Jakarta_Sans'] underline leading-[21px]"
            onClick={openModal}
          >
            Customize Deal Card?
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942"
              stroke="#FAFAFA"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] border-solid box-border content-stretch flex flex-col gap-[16px] items-center pb-[16px] pt-0 px-[16px] relative rounded-[24px] size-full cursor-pointer"
        data-name="Card"
        data-node-id="1:1652"
        role="button"
        tabIndex={0}
      >
        <div
          className="border-[rgba(235,239,245,0.12)] border-b border-l-0 border-r-0 border-solid border-t-0 box-border content-stretch flex flex-col gap-[16px] items-start px-0 py-[16px] relative shrink-0 w-full"
          data-node-id="1:1653"
        >
          <div
            className="content-stretch flex items-center justify-between relative shrink-0 w-full"
            data-node-id="1:1654"
          >
            <div
              className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative shrink-0"
              data-node-id="1:1655"
            >
              <div
                className="bg-gray-50 border-2 border-[rgba(255,255,255,0.08)] border-solid box-border content-stretch flex gap-[10px] items-center justify-center p-[10px] relative rounded-[100px] shrink-0 size-[56px]"
                data-node-id="1:1656"
              >
                <div
                  className="h-[45px] relative shrink-0 w-[21px]"
                  data-name="logo"
                  data-node-id="1:1657"
                >
                  {logoComponent}
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0"
                data-node-id="1:1659"
              >
                <div
                  className="content-stretch flex gap-[8px] items-center relative shrink-0"
                  data-node-id="1:1660"
                >
                  <p
                    className="font-medium leading-[normal] relative shrink-0 text-[20px] text-white"
                    data-node-id="1:1661"
                  >
                    {title}
                  </p>
                  {verified && (
                    <div
                      className="relative shrink-0 size-[24px]"
                      data-name="verification-icon"
                      data-node-id="1:1662"
                    >
                      <VerificationIcon />
                    </div>
                  )}
                </div>
                <p
                  className="leading-[normal] not-italic relative shrink-0 text-[#cbd2da] text-[12px]"
                  data-node-id="1:1664"
                >
                  {category}
                </p>
              </div>
            </div>
            <div
              className="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex gap-[16px] items-start px-[12px] py-[4px] relative rounded-[100px] shrink-0"
              data-name="Container"
              data-node-id="1:1665"
            >
              <p
                className="leading-[normal] not-italic relative shrink-0 text-[12px] text-center text-gray-50"
                data-node-id="1:1666"
              >
                {dealType}
              </p>
            </div>
          </div>
          <div
            className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
            data-node-id="1:1667"
          >
            <p
              className="leading-[normal] not-italic relative shrink-0 text-[#cbd2da] text-[12px] w-full whitespace-pre-wrap"
              data-node-id="1:1668"
            >
              {description}
            </p>
            <div
              className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
              data-node-id="1:1669"
            >
              <p
                className="leading-[normal] not-italic relative shrink-0 text-[#ebeff5] text-[14px]"
                data-node-id="1:1670"
              >
                What's Included
              </p>
              <div
                className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0"
                data-node-id="1:1671"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="content-stretch flex gap-[8px] items-center relative shrink-0"
                    data-node-id="1:1672"
                  >
                    <CheckCircle className="overflow-clip relative shrink-0 size-[20px]" />
                    <p
                      className="font-normal leading-[21px] relative shrink-0 text-[14px] text-white"
                      data-node-id="1:1674"
                    >
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex items-center justify-between px-[16px] py-[8px] relative rounded-[100px] shrink-0 w-full"
            data-node-id="1:1684"
          >
            <div
              className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0"
              data-node-id="1:1685"
            >
              <p
                className="leading-[normal] not-italic relative shrink-0 text-[14px] text-neutral-50"
                data-node-id="1:1686"
              >
                {discount}
              </p>
            </div>
            <p
              className="leading-[normal] not-italic relative shrink-0 text-[14px] text-zinc-200"
              data-node-id="1:1687"
            >
              {savings}
            </p>
          </div>
        </div>
        <div
          className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full"
          data-name="Filter"
          data-node-id="1:1688"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
              openModal();
            }}
            className="bg-[rgba(255,255,255,0.08)] box-border content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-[12px] py-[8px] relative rounded-[100px] shrink-0 hover:bg-[rgba(255,255,255,0.12)] transition-colors"
            data-name="All Assets"
            data-node-id="1:1689"
          >
            <p
              className="leading-[24px] not-italic relative shrink-0 text-[16px] text-neutral-50"
              data-node-id="1:1690"
            >
              View Details
            </p>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGetDeal?.();
            }}
            className="group bg-white hover:bg-linear-to-b hover:from-[#501BD6] hover:to-[#7F57E2] box-border content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px px-[12px] py-[8px] relative rounded-[100px] shrink-0 transition-all duration-200"
            data-name="All Assets"
            data-node-id="1:1691"
          >
            <p
              className="leading-[24px] not-italic relative shrink-0 text-[16px] text-zinc-950 group-hover:text-white transition-colors duration-200"
              data-node-id="1:1692"
            >
              Get This Deal
            </p>
          </button>
        </div>
      </div>
      {/* Modal: basic details popup */}
      {showModal && (
        <CardPopup
          onClose={closeModal}
          onDelete={onDelete}
          deal={{
            id,
            title,
            category,
            description,
            logoComponent,
            verified,
            dealType,
            features,
            discount,
            savings,
          }}
        />
      )}
    </div>
  );
}
