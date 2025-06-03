import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStays } from "../store/stay/stay.actions.js";
import { StayList } from "../cmps/StayList.jsx";
import { Filters } from "../cmps/Filters";
import { LabelsScrollerBar } from "../cmps/LabelsScrollerBar.jsx";
import { debounce } from "../services/util.service.js";
import { SET_FILTER_BY } from "../store/stay/stay.reducers.js";
import { applyFilter } from "../services/stay.service.js";
import { useSearchParams } from "react-router-dom";

export function StayIndex() {
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState("Countryside");
  const [page, setPage] = useState(1);
  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);

  const [isMiddleFilterOpen, setIsMiddleFilterOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const onSetFilter = (filterBy) => {
    dispatch({ type: SET_FILTER_BY, filterBy });
  };

  const debouncedLoadStays = useCallback(
    debounce((filters) => {
      console.log("StayIndex: Debounced dispatch loadStays with filters:", filters);
      dispatch(loadStays(filters, page)).catch((err) => console.log(err));
    }, 500),
    [dispatch, page]
  );

  useEffect(() => {
    debouncedLoadStays(filterBy);
  }, [filterBy, page, debouncedLoadStays]);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="stay-index">
      <Filters
        filterBy={filterBy}
        onSetFilter={onSetFilter}
        // isMiddleFilterOpen={isMiddleFilterOpen}
        // setIsMiddleFilterOpen={setIsMiddleFilterOpen}
      />
      <LabelsScrollerBar
        selectedLabel={selectedLabel}
        onLabelSelect={(label) => {
          setSelectedLabel(label);
          setPage(1);
          applyFilter(
            { ...filterBy, labels: label },
            setSearchParams,
            dispatch,
            onSetFilter
          );
        }}
      />
      {stays.length ? (
        <StayList stays={stays} />
      ) : (
        <p className="no-stays-msg">No stays found</p>
      )}
    </section>
  );
}
