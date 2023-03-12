import "./PopupStudent.css";

const PopupStudent = (props) => {
  return props.trigger ? (
    <div className='popupCourse'>
      <div className='popup-inner'>
        <button className='close-course-btn' onClick={()=>(window.location.reload())}>
          {""}
          close
         
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopupStudent;
