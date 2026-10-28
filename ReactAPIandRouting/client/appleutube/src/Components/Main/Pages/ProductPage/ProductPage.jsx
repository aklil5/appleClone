import React, { useState, useEffect } from 'react'
import Four04 from '../Four04/Four04'

import { useParams } from 'react-router-dom';

export default function ProductPage() {
    const [product, setProduct] = useState([]);
    // console.log(useParams());
    const { productID } = useParams();
    console.log(productID);

    useEffect(() => {
        fetch("http://localhost:3001/iphones")
        //  /iphone.json to connect with db
            .then((res) => res.json())
            .then((data) => {
                const productList = data.products;
                console.log(productList);
                const singleProduct = productList.filter(
                    (product) => product.product_url === productID
                );
                setProduct(singleProduct);
            })
            .catch(() => console.log("Error: unable to fetch!!"));
    }, [productID]);
  return (
    <div>
        <section className="internal-page-wrapper">
            <div className="container">
                <br />
                <br />
                <br />
                {product.length ? (
                    product.map((product) => (
                        <div key={product.product_id}>
                            <div className="row justify-content-center text-center">
                                <div className="col-12 mt-5 pt-5">
                                    <div className="title-wraper font-weight-bold">
                                        {product.product_name}
                                    </div>
                                    <div className="brief-description">
                                        {product.Product_brief_description}
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-center text-center product-holder h-100 my-5">
                                <div className="col-sm-12 col-md-6 my-auto">
                                    <div className="starting-price">
                                        {`Starting at ${product.Starting_price}`}
                                    </div>
                                    <div className="monthly-price">
                                        {product.Price_range}
                                    </div>
                                    <div className="product-details">
                                        {product.Product_description}
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="product-image">
                                        <img src={product.Product_img} alt="product" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Four04 />
                )}
                
            </div>
        </section>
    </div>

  )
}
