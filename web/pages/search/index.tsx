import React from "react";
import StorySearch from "../../components/Containers/StorySearch";
import StoryNavbar from "../../components/Navbars/StoryNavbar";
import { useGetSearchInputFromUrl } from "../../utils/hooks";

interface searchPageProps {}

const SearchPage: React.FC<searchPageProps> = ({}) => {
  const [searchValue, searchTag] = useGetSearchInputFromUrl();

  if (!searchValue) {
    return (
      <div className="dark:bg-gray-800 dark:text-white transition-colors ease duration-300">
        <StoryNavbar />
        <div className="pt-16 container mx-auto">
          type name of the story you would like to search
        </div>
      </div>
    );
  }

  return <StorySearch value={searchValue} tag={searchTag} />;
};

export default SearchPage;
