import { useSelector } from "react-redux";
import { UpperFilter } from "../cmps/UpperFilter.jsx";
import { MiddleFilter } from "../cmps/MiddleFilter.jsx";
import { MobileFilter } from "../cmps/MobileFilter.jsx";
import useIsMobile from "../hooks/useIsMobile";
import useScrollTop from "../hooks/useScrollTop.jsx";

export function Filters({ filterBy, onSetFilter }) {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  const isMobile = useIsMobile();
  const isAtTop = useScrollTop();

  return (
    <>
      {isMobile ? (
        <MobileFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      ) : (
        <>
          <UpperFilter
            isAtTop={isAtTop}
            filterBy={filterBy}
            onSetFilter={onSetFilter}
          />
          {isAtTop && (
            <MiddleFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          )}
        </>
      )}
    </>
  );
}
