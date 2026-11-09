import React from "react";
import CTAButton from "./CTAButton";
import { ClipboardList } from "lucide-react";

const CTAButton1 = ({ isFixed = false, children, ...props }) => {
  const greenIcon = isFixed ? <ClipboardList size={20} /> : <ClipboardList size={20} />;

  return (
    <CTAButton
      isFixed={isFixed}
      variant="green"
      icon={greenIcon}
      {...props}
    >
      {children}
    </CTAButton>
  );
};

export default CTAButton1;