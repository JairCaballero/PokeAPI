import '../sass/Button.scss';

const Button = ({ icon,handleClic }) => {
  return (
    <div className='button__box'>
      <button className='button' onClick={handleClic}> {icon} </button>
      <div className="button__shadow"></div>
    </div>
  )
}

//para evitar que canvien nombre al inportar
export {Button};

