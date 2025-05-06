
import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="col-span-2 border-b pb-2 mb-4">
      <h3 className="text-md font-medium text-primary">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
};

export default SectionHeader;
