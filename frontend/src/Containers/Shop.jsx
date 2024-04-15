import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import NavBar from "../Components/NavBar";
import { useSelected } from "../Helper/selectedContext";
import { ProductDetails, addToCart } from "../Helper/Helper";
import Loader from "../Components/Loader";
import ProductView from "../Components/ProductView";
import toast,{ Toaster }from "react-hot-toast";
import  SearchField  from "../Components/SearchButton";
import Search from "@mui/icons-material/Search";


export default function Shop() {

    const navigate = useNavigate();
    const [category,setcategory] = useState();
    const [filter,setfilter] = useState();
    const [filterState,setfilterState] = useState(false)
    const [isLoading,setisLoading] = useState(true);
    const {setItem} = useSelected();
    const [selectedproduct,setselectedproduct]= useState();
    const [showModel,setshowModel] = useState(false);
    const [activePage, setActivePage] = useState('Shop');
    const [shopitem, setShopItem] = useState();

    const handleProductClick = (item) =>{
        setshowModel(true)
        setselectedproduct(item)
    }

    const handleAddCartButtonClick = async (item) =>{
        await addToCart({values:{'productid':item.id}})
        .then((res) =>{
            navigate('/cart');
        })
        .catch((err) =>{
            console.log(err)
            toast.error(err.response.data.productid[0])
            // toast.error('item already exist in cart')
        })
    }
    const handleSearch =(query) =>{
        let filter;
        filter = shopitem?.filter((data) =>
            data.name.toLowerCase().includes(query.toLowerCase())
        )
        setfilterState(true)
        setfilter(filter)
    }

    
    useEffect(() =>{
        const fetchDetails = async () =>{
            ProductDetails().then((res) =>{
                setShopItem(res)
                let category = new Set(res.map((item) => {
                    return item.category
                }))
                let cato = [...category]
                setcategory(cato)
                setisLoading(false)
              })
        }
      fetchDetails()
    },[])

    const handleBuyButtonClick = (item) => {
        setItem(item);
        console.log(item)
        // window.location.href='https://rzp.io/l/97K0WATDX'
        navigate('/checkout');
    }
    const closeModel = () =>{
        setshowModel(false)
        setselectedproduct(null)
    }
    const handlefilterClick = (filter) =>{
        setfilterState(true)
        let filteredProducts= shopitem.filter((item)=>{
            return item.category === filter
        
         })
        setfilter(filteredProducts)
            }
            const clearFilter =() =>{
                setfilterState(false)
                setfilter(null)
        }

   if (isLoading) {
    return( 
        <div><Loader/></div>
    );
   } else {
    return(
        <div className="Shop-Container">
            <Toaster position='top-center' reverseOrder={false}/>
            {showModel && 
            <ProductView isShow = {showModel}  closeModel = {closeModel} >
                <span className="product-view">

            <h2>{selectedproduct.name}</h2>
            <img src={selectedproduct.image} alt="-cover" />
            <h3>{selectedproduct.description}</h3>
                </span>
            <Button padding={'0.5em'} bgcolor={'gold'} radius={'0.5em'} text={'Buy Now'} customClass={'button-4'} onClick={() =>handleBuyButtonClick(selectedproduct)} />
                </ProductView>}
            <NavBar type={'paged'} activeElement={activePage} />
            <main className="body">
                <div className="centerAlign">
                <SearchField onchange={(e) =>handleSearch(e.target.value)} placeholder={'search...'} showlegend={'none'} postfixIcon={'search'} width={'60%'}/>
                </div>
            <div className="top">
                <h1 className="Heading-1">Discover The Perfect TimePiece for Every Moment</h1>
                <div className="cat">
                   <span className="filterButton" >
                    <span className="button-2">Filter</span>
                    <ul className="options">
                   {category?.map((categ,index) =>(
                    <li key={index} onClick={() =>handlefilterClick(categ)} >{categ}</li>)
                    )}
                    <li onClick={() =>clearFilter()}>clear</li>
                   </ul>
                   </span>
                   
                </div>
                {/* <p className="para">We prioritize comfort without sacrificing style. Sink into the plush cushions and experience the luxurious feel of our sofas, chairs, and more. Your relaxation is our top priority.</p> */}
            </div>

            {!filterState &&
            <section className="main">
                {
                    shopitem?.map((item,index) => (
                        <div className="card" key={index} onClick={() =>
                            handleProductClick(item)
                        }>
                            <div className="img-container">
                                <img src={item?.image} alt="text image" className="textimage" />
                            </div>
                            <div className="details">
                                <div className="left">
                                    <h3 className="name">{item.name}</h3>
                                    <span className="price">Price : &#8377; {item.price}</span>
                                    <span className="type">Category : {item.category}</span>
                                </div>
                                <div className="right">
                                    <Button onClick={() =>handleBuyButtonClick(item)} text={'Buy now'} customClass={'button-2'} />
                                    <Button text={'Add to Cart'} onClick={() => handleAddCartButtonClick(item)} customClass={'button-2'} />
                                </div>
                            </div>
                        </div>
                    ) )
                }

            </section>}

            {filterState &&
            <section className="main">
                {
                    filter?.map((item,index) => (
                        <div className="card" key={index} onClick={() =>
                            handleProductClick(item)
                        }>
                            <div className="img-container">
                                <img src={item?.image} alt="text image" className="textimage" />
                            </div>
                            <div className="details">
                                <div className="left">
                                    <h3 className="name">{item.name}</h3>
                                    <span className="price">Price : &#8377; {item.price}</span>
                                    <span className="type">Category : {item.category}</span>
                                </div>
                                <div className="right">
                                    <Button onClick={() =>handleBuyButtonClick(item)} text={'Buy now'} customClass={'button-2'} />
                                    <Button text={'Add to Cart'} onClick={() => handleAddCartButtonClick(item)} customClass={'button-2'} />
                                </div>
                            </div>
                        </div>
                    ) )
                }

            </section>}
            </main>
        </div>
    );
   }
}







