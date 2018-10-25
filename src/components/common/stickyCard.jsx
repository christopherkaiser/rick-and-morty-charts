import React from "react";

//hoveredCharacterImageSrc
//{hoveredCharacter ? hoveredCharacter.name : "Rick and Morty"}

const StickyCard = ({ imgSrc, title, detailsSet }) => {
  return (
    <div className="card" style={{ position: "sticky", top: 0 }}>
      <img className="card-img-top" src={imgSrc} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="card-text">
          <table className="table">
            <tbody>
              {detailsSet.map(
                d =>
                  d.details ? (
                    <tr key={d.label}>
                      <td>{d.label}</td>
                      <td>{d.details}</td>
                    </tr>
                  ) : (
                    <React.Fragment key={d.label} />
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StickyCard;
