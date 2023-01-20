import "./DataEntry.styles.css";

const DataEntry = ({ name, value }) => {
  return (
    <div className="data-entry">
      <p className="data-entry__name">{name}</p>
      <p className="data-entry__value">{value}</p>
    </div>
  );
};

export default DataEntry;
