import React, { useCallback, useState } from "react";
import SectionTitle from "../section/SectionTitle";
import siteConfig from "../../config/siteConfig";
import PressCard from "./PressCard";
import ModalVideo from "./ModalVideo";

const PressSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const handleClose = useCallback(() => setSelectedVideo(null), []);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-2 bg-gray-50">
      <SectionTitle title={siteConfig.PRESS_DATA_APP.TITLE} subtitle={siteConfig.PRESS_DATA_APP.SUBTITLE} />
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {siteConfig.PRESS_DATA.map((item) => (
            <PressCard key={item.id} name={item.title} poster={item.poster} onClick={() => setSelectedVideo(item)} />
          ))}
        </div>
      </div>
      {selectedVideo && <ModalVideo src={selectedVideo.video} poster={selectedVideo.poster} title={selectedVideo.title} onClose={handleClose} />}
    </div>
  );
};

export default PressSection;
