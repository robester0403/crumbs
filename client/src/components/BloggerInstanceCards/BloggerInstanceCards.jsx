
import './BloggerInstanceCards.scss';

function BloggerInstanceCards({renderInstance}) {


  return (
    <>
      <section className="bloggercards">
        <h4 className="bloggercards__subheader">
          {renderInstance.bizName}: {renderInstance.name}
        </h4>
        <div className="bloggercards__body">
          {renderInstance.address1}
        </div>
        <div className="bloggercards__body">
          {renderInstance.city}, {renderInstance.country}, {renderInstance.state}
        </div>
      </section>
    </>
  )
}

export default BloggerInstanceCards;