
import './BloggerInstanceCards.scss';

function BloggerInstanceCards({renderInstance}) {
  // We might need to change this

  return (
    <>
      <section>
        <h4>
          {renderInstance.bizName}
        </h4>
        <h4>
          {renderInstance.name}
        </h4>
        <div>
          {renderInstance.address1}
        </div>
        <div>
          {renderInstance.city}, {renderInstance.country}, {renderInstance.state}
        </div>
        <div>
          {renderInstance.phone}
        </div>
        
      </section>
    </>
  )
}

export default BloggerInstanceCards;