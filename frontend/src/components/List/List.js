import { useMemo } from "react";
import "./List.styles.css";
import Trip from "../Trip/Trip";
import Button from "../Button/Button";

const List = ({
  title,
  data,
  maxItems,
  type,
  handleSeeAll,
  emptyListMessage,
}) => {
  const displayedData = useMemo(() => {
    if (maxItems) {
      return data.slice(0, maxItems);
    }
    return data;
  }, [data, maxItems]);

  const displaySeeAll = useMemo(() => data.length > maxItems, [data, maxItems]);

  return (
    <div className="list">
      {!!title && <h2 className="list__title">{title}</h2>}
      {!!displayedData.length &&
        displayedData.map((trip) => (
          <Trip key={`${type}-${trip.id.toString()}`} data={trip} type={type} />
        ))}
      {!displayedData.length && (
        <p className="list__empty">
          {emptyListMessage || "There is no data to display"}
        </p>
      )}
      {displaySeeAll && (
        <div className="list__display-all">
          <div className="list__button">
            <Button text={"See all"} onClick={handleSeeAll} />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
