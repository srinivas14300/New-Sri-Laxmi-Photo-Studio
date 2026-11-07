import React from 'react';
import { ServicesCarousel } from '../../components/home/ServicesCarousel';
import { PhotographyWorkGallery } from '../../components/home/PhotographyWorkGallery';
import { MinimalEnquiryTransition } from '../../components/home/MinimalEnquiryTransition';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF8F5] overflow-x-hidden text-stone-900">
      {/* Section 2: Main Photography Services Carousel */}
      <ServicesCarousel />

      {/* Section 3: Our Photography Work */}
      <PhotographyWorkGallery />

      {/* Section 4: Minimal Enquiry Transition */}
      <MinimalEnquiryTransition />
    </div>
  );
};
