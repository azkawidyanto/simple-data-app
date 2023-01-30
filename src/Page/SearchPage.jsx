import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CatData from "../Component/CatData"
import { storeCats } from "../Redux/reducer"

const BASE_URL = 'https://api.api-ninjas.com/v1/cats'

const SearchPage =() =>{
    const [searchName,setSearchName] = useState('')
    const [searchMinWeight,setSearchMinWeight] = useState('')
    const [searchMaxWeight,setSearchMaxWeight] = useState('')
    const [searchMinLife,setSearchMinLife] = useState('')
    const [searchMaxLife,setSearchMaxLife] = useState('')

    const dataCats = useSelector((state)=> state?.cats?.cats);
    const dispatch = useDispatch();
    const [showData,setShowData] = useState(false)
    const listData = async(name, minLife,maxLife, minWeight,maxWeight)=>{
        const response = await fetch(`${BASE_URL}?name=${name}&min_weight=${minWeight}&max_weight=${maxWeight}
        &min_life_expectancy=${minLife}&max_life_expectancy=${maxLife}`,{
            headers:{ 'X-Api-Key': 'jdGmER1XUjP2GcJT/qQaIA==otdAHgKZRXqxe5y4' },
        }).then(res => res.json())

        return response
    }

    const handleSubmitName = (e) =>{
        e.preventDefault();
        console.log(e.target?.[0].value)
        const query = e.target?.[0].value;
        listData({name:query}).then((data) => 
             dispatch(storeCats(data[0])
        ))
    }
    const handleSubmitMaxLife = (e) =>{
        e.preventDefault();
        const query = e.target?.[0].value;
        listData({maxLife: query}).then((data) => 
             dispatch(storeCats(data[0])
        ))
    } 
       const handleSubmitMinLife = (e) =>{
        e.preventDefault();
        const query = e.target?.[0].value;
        listData({minLife: query}).then((data) => 
             dispatch(storeCats(data[0])
        ))
    }   
     const handleSubmitMaxWeight = (e) =>{
        e.preventDefault();
        const query =e.target?.[0].value;
        listData({maxWeight:query}).then((data) => 
             dispatch(storeCats(data[0])
        ))
    }   
     const handleSubmitMinWeight = (e) =>{
        e.preventDefault();
        const query = e.target?.[0].value;
        listData({minWeight: query}).then((data) => 
             dispatch(storeCats(data[0])
        ))
    }

    useEffect(()=>{
        listData(searchName,searchMinLife,searchMaxLife,searchMinWeight, searchMaxWeight).then((data)=>
            dispatch(storeCats(data))
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);
    
    useEffect(()=>{
        if(Object.values(dataCats)?.length > 0 ){
            setShowData(true)
        }}
    ,[dataCats])

    return(
        <div style={{backgroundColor:'grey', height:'100vh'}}>
            <div className='input-container' >
                <form data-testid="custom-element"  onSubmit={(e)=> handleSubmitName(e)}>
                    <label for='name'>Name</label>
                    <input 
                    id='name'
                    style={{marginRight:"1vw"}}
                    type="text"  
                    value={searchName}
                    placeholder='name'
                    onChange={(e)=> setSearchName(e.target.value)} />
                   
                    <button variant="solid">Search</button>
                </form>
                <form data-testid="custom-element"  onSubmit={(e)=> handleSubmitMinWeight(e)}>
                    <label for='minWeight'>Minimal Weight</label>
                    <input 
                    id='minWeight'
                    style={{marginRight:"1vw"}}
                    type="text"  
                    value={searchMinWeight}
                    placeholder="minimal weight"
                    onChange={(e)=> setSearchMinWeight(e.target.value)} />
                    
                    <button variant="solid">Search</button>
                </form>
                <form data-testid="custom-element"  onSubmit={(e)=> handleSubmitMaxWeight(e)}>
                    <label for='maxWeight'>Maximal Weight</label>
                    <input 
                    id='maxWeight'
                    style={{marginRight:"1vw"}}
                    type="text"  
                    value={searchMaxWeight}
                    placeholder='max weight'
                    onChange={(e)=> setSearchMaxWeight(e.target.value)} />
                   
                    <button variant="solid">Search</button>
                </form>
                <form data-testid="custom-element"  onSubmit={(e)=> handleSubmitMinLife(e)}>
                    <label for='minLife'>Minimal Life</label>
                    <input 
                    id='minLife'
                    style={{marginRight:"1vw"}}
                    type="text"  
                    value={searchMinLife}
                    placeholder="minimal life"
                    onChange={(e)=> setSearchMinLife(e.target.value)} />

                    <button variant="solid">Search</button>
                </form>
                <form data-testid="custom-element"  onSubmit={(e)=> handleSubmitMaxLife(e)}>
                    
                    <label for='maxLife'>Maximal Life</label>
                    <input 
                    id='maxLife'
                    style={{marginRight:"1vw"}}
                    type="text"  
                    value={searchMaxLife}
                    placeholder='max life'
                    onChange={(e)=> setSearchMaxLife(e.target.value)} />
                    <button variant="solid">Search</button>
                </form>
            </div>

            <div className='container'>
               {showData &&  <CatData
                    name={dataCats?.name}
                    image_link={dataCats?.image_link} 
                    origin={dataCats?.origin}
                    length={dataCats?.length}
                    maxLife={dataCats?.max_life_expectancy}
                    minLife={dataCats?.min_life_expectancy}
                    minWeight={dataCats?.min_weight}
                    maxWeight={dataCats?.max_weight}
                />}
            </div>

        </div>
    )

}

export default SearchPage