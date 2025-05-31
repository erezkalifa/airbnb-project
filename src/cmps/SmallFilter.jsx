// export function SmallFilter() {
//   return (
//     <section className="small-filter">
//       <div className="section">Anywhere</div>
//       <div className="section">Any week</div>
//       <div className="section">Add guests</div>
//       <button className="search-btn">🔍</button>
//     </section>
//   );
// }
export function SmallFilter({ onOpenFilter }) {
  return (
    <section className="small-filter">
      <div className="section" onClick={() => onOpenFilter('location')}>Anywhere</div>
      <div className="section" onClick={() => onOpenFilter('dates')}>Any week</div>
      <div className="section">Add guests</div>
      <button className="search-btn">🔍</button>
    </section>
  );
}