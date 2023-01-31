const CatData = props => {
  return (
    <div className="card">
      <img className="card-img-top" src={props.image_link} style={{ width: '20vw' }} alt={`${props.name}`} />
      <div className="container-data">
        <h2>{props.name}</h2>
        <h3>{props.origin}</h3>
        <h3>{props.length}</h3>
        <h3>{`age : ${props.minLife} to ${props.maxLife}`}</h3>
        <h3>{`weight : ${props.minWeight} to ${props.maxWeight}`}</h3>
      </div>
    </div>
  );
};

export default CatData;
