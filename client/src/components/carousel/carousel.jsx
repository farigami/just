import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import tovar from '../../static/1.jpg'
import tovarr from '../../static/2.png'
import './carousel.scss'
import { useNavigate } from 'react-router-dom';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate()
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className='slider'>
            <Carousel.Item style={{'cursor': 'pointer'}} onClick={() => navigate('/product/4-Kruga-3-muzhika-i-podruga')}>
                <img src={tovar}  className="d-block" />
                <Carousel.Caption >
                    <h4>Комбо недели "4 круга 3 мужика и подруга"</h4>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={tovarr}  className="d-block " />
    
            </Carousel.Item>
        </Carousel>
    );
}

export default ControlledCarousel;