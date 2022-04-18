import { useState, useEffect } from 'react';

function ColorPicker(props) {
  const [availableColors, setAvailableColors] = useState([]);

  function fetchColors() {
    fetch('http://127.0.0.1:5000/available-colors')
      .then(res => res.json())
      .then(
        (result) => {
          setAvailableColors(result.colors);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    fetchColors();
  }, []);

  function setColor(color) {
    props.callback(color);
  }

  function ColorIcon(color) {
    if (color == props.selectedColor) {
      return <i className="bi-check-circle-fill" style={{ color: color }} />
    } else {
      return <i className="bi-circle-fill" style={{ color: color }} />
    }
  }

  const items = availableColors.map((color) => {
    return (
      <div className="col-1" key={color} onClick={(e) => setColor(color)}>
        {ColorIcon(color)}
      </div>
    );
  });

  return (
    <div className="row justify-content-center pt-3">
      {items}
    </div>
  )
}

export default ColorPicker;
