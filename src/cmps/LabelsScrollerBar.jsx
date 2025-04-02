import { useState ,useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import '../assets/css/cmps/label-scroller-bar.scss'
import {stayService} from '../services/stay.service.js'

export function LabelsScrollerBar({selectedLabel, onLabelSelect}){
    const [labels , setLabels] = useState([])
    const[windowWidth , setWindowWidth] = useState(window.innerWidth)
    // const labels = ['Amazing views','Icons','OMG!',
    //                 'Castles','A-frames','Top cities','Beachfront',
    //                 'Amazing pools','Mansions','Cabins','Countryside','Leakfront']
    
    useEffect(() =>{
        const labelsFromService = stayService.getLabels()
        setLabels(labelsFromService)

        const resize = () =>{
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize' , resize)

        return () =>{
            window.removeEventListener('resize',resize)
        }
    },[])

    const getBreakPoint = () =>{
        if(windowWidth >= 3000) return 'superLargeDesktop'
        if(windowWidth >= 1024) return 'desktop'
        if(windowWidth >= 464) return 'tablet'
        return 'mobile'
    }

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 18 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 19 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 10 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 10 },
    }

    const currentBreakPoint = getBreakPoint()
    const countVisibleItem = responsive[currentBreakPoint].items
    const getSlidesPerPage = labels.length % countVisibleItem


    return(
        <Carousel
        responsive={responsive}
        swipeable={windowWidth < 768}
        draggable={windowWidth < 768}
        className='labels-carousel'
        itemClass='carousel-item-container'
        containerClass='carousel-container'
        dotListClass='custom-dot-list-style'
        arrows={windowWidth >= 768}
        rewind={false}
        infinite={false}
        slidesToSlide={getSlidesPerPage > 0 ? getSlidesPerPage : 7}
        >
            {labels.map((label , idx) => (
                <div className={`carousel-item ${selectedLabel === label.name ? 'active' : ''}`} key={idx} onClick={() => onLabelSelect(label.name)}
                  style={{ listStyle: 'none' }}
                  >
                    <img src={label.img} alt={label.name} />
                    <p>{label.name}</p>
                </div>
            ))}
        </Carousel>
    )
}