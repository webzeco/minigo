import React, { useContext } from 'react';
import { ProductDetailContext } from '../contexts/ProductDetailContext';
import './style/carauosel.css';

export default function TryCarauosel({getRelatedProducts}) {
    const { relatedProd } = useContext(ProductDetailContext);

    let items = document.querySelectorAll('.carousel-item')
    items.forEach((el) => {
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                next = items[0]
            };
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    });

    return (
        <div>
            <div class="container text-center my-3">
                <h2 class="font-weight-light">Bootstrap Multi Slide Carousel</h2>
                <div class="row mx-auto my-auto justify-content-center">
                    <div id="recipeCarousel" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            {/* {relatedProd?.relatedProd.map(prod=>{
                                return (
                                )
                            })} */}
                            <div class="carousel-item active">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/31f?text=1" class="img-fluid" />
                                        </div>
                                        <div class="card-img-overlay">Slide 1</div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item ">
                                <div class="col-md-3">
                                    <div class="card">
                                        <div class="card-img">
                                            <img src="//via.placeholder.com/500x400/fc0?text=6" class="img-fluid" />
                                        </div>
                                        <div class="card-img-overlay">Slide 6</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a class="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a class="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
                <h5 class="mt-2 fw-light">advances one slide at a time</h5>
            </div>
        </div>
    )
}
