import React from "react";
import { ChevronDown } from "lucide-react";

const EstimateShippingModal = ({ shippingOptions }) => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 mb-2">
        <div>Shipping Method</div>
        <div>Delivery Time</div>
        <div>Cost</div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm py-2 border-t border-gray-200">
        {shippingOptions &&
          shippingOptions?.map((item,i) => (
            <>
              <div>{item?.service}</div>
              <div> - </div>
              <div className="flex items-center">
                 ${item?.price}
              </div>
            </>
          ))}
      </div>
    </div>
  );

};

export default EstimateShippingModal;
