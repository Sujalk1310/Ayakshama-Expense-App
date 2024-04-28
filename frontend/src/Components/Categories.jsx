import CategoryCard from './CategoryCard';

const Categories = ({ categoryAnalyticsData }) => {

  return (
    <div className='flex flex-col'>
      <div className="flex flex-wrap flex-col justify-content-center md:flex-row gap-6 w-full">
        {(categoryAnalyticsData && categoryAnalyticsData.length > 0) ? categoryAnalyticsData.map((data, index) => (
          (data.name !== 'Miscellaneous') ?
          <CategoryCard key={index} {...data} /> : <></>
        )) : <div className="text-center" style={{ fontSize: "30px", fontWeight: "bold" }}>No Categories Found!</div>}
      </div> 
  </div>
  );
};

export default Categories;
