import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StayList } from "../cmps/StayList.jsx";
import { Filters } from "../cmps/Filters";
import { LabelsScrollerBar } from "../cmps/LabelsScrollerBar.jsx";
import { SET_FILTER_BY, APPEND_STAYS } from "../store/stay/stay.reducers.js";
import { stayService } from "../services/stay.service.js";

export function StayIndex() {
  const dispatch = useDispatch();

  const stays = useSelector((storeState) => storeState.stayModule.stays);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);

  const [selectedLabel, setSelectedLabel] = useState("Countryside");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const bottomRef = useRef(null);

  function onSetFilter(filterBy) {
    dispatch({ type: SET_FILTER_BY, filterBy });
  }

  useEffect(() => {
    async function loadInitial() {
      setPage(1);
      setHasMore(true);
      const initialStays = await stayService.query(filterBy, 1, 12);

      dispatch({ type: SET_FILTER_BY, filterBy }); // רק ליתר ביטחון
      dispatch({ type: "SET_STAYS", stays: initialStays });
    }
    loadInitial();
  }, [filterBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          setIsLoading(true);

          const nextPage = page + 1;
          const newStays = await stayService.query(filterBy, nextPage, 12);

          const existingIds = new Set(stays.map((s) => s._id));
          const uniqueStays = newStays.filter((s) => !existingIds.has(s._id));

          await new Promise((res) => setTimeout(res, 1000));

          if (uniqueStays.length > 0) {
            dispatch({ type: APPEND_STAYS, stays: uniqueStays });
            setPage((prev) => prev + 1);
          } else {
            setHasMore(false);
          }

          setIsLoading(false);
        }
      },
      {
        root: null,
        threshold: 1.0,
        rootMargin: "0px",
      }
    );

    const el = bottomRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [stays, isLoading, hasMore, page, filterBy]);

  return (
    <section className="stay-index">
      <Filters filterBy={filterBy} onSetFilter={onSetFilter} />

      <LabelsScrollerBar
        selectedLabel={selectedLabel}
        onLabelSelect={(label) => {
          setSelectedLabel(label);
          onSetFilter({ ...filterBy, labels: label });
        }}
      />

      {stays.length ? (
        <StayList stays={stays} />
      ) : (
        <p className="no-stays-msg"></p>
      )}

      {isLoading && (
        <div className="spinner-container">
          <div className="airbnb-spinner"></div>
        </div>
      )}

      <div ref={bottomRef} style={{ height: "1px" }}></div>
    </section>
  );
}
