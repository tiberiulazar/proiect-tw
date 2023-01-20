import Button from "../../../../components/Button/Button";
import DataEntry from "../DataEntry/DataEntry";

const DisplayData = ({ values, setEditOn }) => {
  return (
    <div className="profile__data">
      <DataEntry name={"First name"} value={values?.firstName} />
      <DataEntry name={"Last name"} value={values?.lastName} />
      <DataEntry name={"Email name"} value={values?.email} />
      <div className="profile__btn">
        <Button text={"Edit"} onClick={() => setEditOn(true)} />
      </div>
    </div>
  );
};

export default DisplayData;
