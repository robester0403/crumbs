
import './MapInstanceCards.scss';
import avatar from "../../assets/images/avatar.png";

function MapInstanceCards({renderInstance, selectVideoFunc}) {
  // We might need to change this
  const selectTrigger = (e) => {
    e.preventDefault();
    selectVideoFunc(renderInstance);
  };
  return (
    <>
      <section className="instance-card">
        <div className="instance-card__avatar">
          <img className="instance-card__avatar-img" src={avatar}/>
        </div>
        <div className="instance-card__text-ctnr">
          <h4 className="instance-card__influencer">
            {renderInstance.name}
          </h4>
          <h4 className="">
            {renderInstance.bizName}
          </h4>
        </div>

        <div className="instance-card__text-ctnr">
          <div className="">
            {renderInstance.address1}
          </div>
          <div className="">
            {renderInstance.city}, {renderInstance.country}, {renderInstance.state}
          </div>
        </div>

        <div className="instance-card__text-ctnr">
          {renderInstance.phone}
        </div>

        <div className="instance-card__text-ctnr-play" onClick={selectTrigger}>
          play icon
        </div>
        
      </section>
    </>
  )
}

export default MapInstanceCards;