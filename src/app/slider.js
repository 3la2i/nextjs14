'use client'

import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DeforestationAwarenessCard = ({ title, description, imgSrc }) => (
  <div className="flex-shrink-0 w-90 mr-6 ">
    <div>
      <div className="w-80 h-80 bg-gray-200 rounded-sm mb-4">
        <img src={imgSrc} alt={title} className="object-cover h-full w-full rounded-sm" />
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
    </div>
  </div>
);

const DeforestationAwarenessSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = sliderRef.current;
      if (container) {
        const scrollAmount = 300;
        const totalWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;

        if (container.scrollLeft + scrollAmount >= totalWidth - containerWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const deforestationInfo = [
    { title: "The Paper Problem", description: "17 trees are cut down for every ton of paper produced", imgSrc: "https://cdn.shopify.com/s/files/1/0571/4477/0620/files/723_600x600.jpg?v=1657131384" },
    { title: "Habitat Loss", description: "Deforestation destroys homes for countless species", imgSrc: "https://vfcfoods.com/wp-content/uploads/2023/03/Habitat-Destruction.jpg" },
    { title: "Climate Impact", description: "Trees absorb CO2; cutting them accelerates climate change", imgSrc: "https://pachamama.org/hs-fs/hubfs/images/pages/home/climate-change-2241061_1280-1.jpeg?width=625&name=climate-change-2241061_1280-1.jpeg" },
    { title: "Water Cycle Disruption", description: "Forests regulate water cycles; their loss affects rainfall", imgSrc: "https://th.bing.com/th/id/OIP.Zy_uUMyEfQgOKNjZSlcPfwHaEo?rs=1&pid=ImgDetMain" },
    { title: "Soil Erosion", description: "Tree removal leads to increased soil erosion and landslides", imgSrc: "https://e0c48a74.rocketcdn.me/wp-content/uploads/2023/08/shutterstock_2300812043-ROTATIONAL-LANDSLIDE.jpg" },
    { title: "Indigenous Communities", description: "Deforestation threatens indigenous peoples' livelihoods", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU3QdPPqKRIagKxuFOsBBmD9EhOPauwaWl3A&s" },
    { title: "Biodiversity Loss", description: "80% of Earth's land animals and plants live in forests", imgSrc: "https://www.fao.org/fileadmin/templates/SOFO/2020/src/images/poster.jpg" },
    { title: "Carbon Storage", description: "Forests store 45% of terrestrial carbon; cutting releases it", imgSrc: "https://www.encyclopedie-environnement.org/app/uploads/2023/01/foret-landes-ouragan-klaus.jpg" },
    { title: "Economic Impact", description: "Deforestation costs global economy up to $4.5 trillion annually", imgSrc: "https://climatetransform.com/wp-content/uploads/2022/04/wood-4745768_1920.jpg" },
    { title: "Sustainable Alternatives", description: "Recycled paper and digital solutions can reduce tree cutting", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWhhH_QsOh7Tc6RVuKJdxaiPxTVaDakkf8A&s" },
  ];

  const scrollbarStyles = {
    overflowX: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };

  return (
    <div className="py-40 h-screen bg-gray-50 ">
      <div>
        <h2 className="text-3xl font-bold text-center mb-20 absolute rotate-[270deg] top-[142%] left-20">Deforestation<br />Awareness</h2>
        <div className="relative ">
          <div
            ref={sliderRef}
            className="flex transition-all duration-500 ease-in-out ml-80"
            style={{
              ...scrollbarStyles,
              scrollBehavior: 'smooth',
              display: 'flex',
            }}
          >
            {deforestationInfo.map((info, index) => (
              <DeforestationAwarenessCard key={index} {...info} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeforestationAwarenessSlider;