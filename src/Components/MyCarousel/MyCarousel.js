import React, {useState} from 'react';
import Carousel, {Dots} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './myCarousel.css'
import first from '../../homepage_hero_image_1.jpg';
import second from '../../homepage_hero_image_2.jpg';
import third from '../../homepage_hero_image_3.jpg';
import fourth from '../../homepage_hero_image_4.jpg';
import fifth from '../../homepage_hero_image_5.jpg';

function MyCarousel(){
    const [value, setValue] = useState(0)

    return (
        <div className='carousel-component'>
            <Carousel 
            value={value}
            onChange={(value) => setValue(value)}
            infinite
            offset={0}
            stopAutoPlayOnHover
            autoPlay={5000}
            animationSpeed={1300} >
                <img alt='glasses and girl' className='first-img' src={first} />
                <img alt='glasses' className='second-img' src={second} />
                <img alt='glasses and guy' className='third-img' src={third} />
                <img alt='glasses on the beach' className='fourth-img' src={fourth} />
                <img alt='glasses and beanie' className='fifth-img' src={fifth} />
            </Carousel>
            <Dots value={value} onChange={(value) => setValue(value)} number={5} />
        </div>
    )
}

export default MyCarousel