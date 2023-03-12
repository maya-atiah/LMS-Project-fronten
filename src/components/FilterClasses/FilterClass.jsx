import "./FilterClass.css";

let FilterProduct = (props) => {
  function onFilterValueChanged(event) {
    props.FilterValueSelected(event.target.value);
  }
  return (
    <div className="filter-area">
      <select name="isAvailable" onChange={onFilterValueChanged}>
        <option value="Grade"> Filter By Grade</option>
        <option value="Grade 1-A">Grade 1-A</option>
        <option value="Grade 1-B">Grade 1-B</option>
        <option value="Grade 2-A">Grade 2-A</option>
        <option value="Grade 2-B">Grade 2-B</option>
      </select>
    </div>
  );
};

export default FilterProduct;
