import { useState, type ReactElement } from "react";
import CardPopup from "./CardPopup";
import { DealCard } from "../../Shared";

interface DealsCardProps {
  id: string;
  title?: string;
  category?: string;
  description?: string;
  logoComponent?: React.ReactNode;
  dealType?: string;
  features?: string[];
  discount?: string;
  savings?: string;
  onViewDetails?: () => void;
  onGetDeal?: () => void;
  onDelete?: () => void;
  showCustomizeHeader?: boolean;
}

export default function DealsCard({
  id,
  title,
  category,
  description,
  logoComponent,
  dealType,
  features,
  discount,
  savings,
  onViewDetails,
  onGetDeal,
  onDelete,
  showCustomizeHeader = true,
}: DealsCardProps): ReactElement {
  const [showModal, setShowModal] = useState(false);

  const openModal = (): void => {
    setShowModal(true);
  };
  
  const closeModal = (): void => {
    setShowModal(false);
  };

  const handleViewDetails = (): void => {
    onViewDetails?.();
    openModal();
  };

  return (
    <>
      <DealCard
        title={title}
        category={category}
        description={description}
        logoComponent={logoComponent}
        dealType={dealType}
        features={features}
        discount={discount}
        savings={savings}
        onViewDetails={handleViewDetails}
        onGetDeal={onGetDeal}
        showCustomizeHeader={showCustomizeHeader}
        onCustomize={openModal}
        customizeHeaderText="Customize Deal Card?"
        buttonLayout="row"
      />

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
            logoComponent: typeof logoComponent === "string" ? logoComponent : undefined,
            dealType,
            features,
            discount,
            savings,
          }}
        />
      )}
    </>
  );
}
