import { useState ,useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {stayService} from '../services/stay.service.js'

export default function LabelsScrollerBar({selectedLabel, onLabelSelect}){
    const [labels , setLabels] = useState([])
    // const labels = ['Amazing views','Icons','OMG!',
    //                 'Castles','A-frames','Top cities','Beachfront',
    //                 'Amazing pools','Mansions','Cabins','Countryside','Leakfront']
    
    useEffect(() =>{
        const labelsFromService = stayService.getLabels()
        setLabels(labelsFromService)
    },[])

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 18 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 19 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 10 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 10 },
      }

    return(
        <Carousel
        responsive={responsive}
        arrows={true}
        swipeable={true}
        draggable={true}
        itemClass="px-1" // spacing between items
        containerClass="pb-2"
        partialVisible
        >
            {labels.map((label , idx) => (
                <div key={idx} onClick={() => onLabelSelect(label.name)}
                  style={{ listStyle: 'none' }}
                  >
                    <img src={label.img} alt={label.name} />
                    <p>{label.name}</p>
                </div>
            ))}
        </Carousel>
    )
}