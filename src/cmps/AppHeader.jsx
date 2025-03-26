import LabelsScrollerBar from './LabelsScrollerBar.jsx'
import { useState } from 'react'

export function AppHeader() {
  const [selectedLabel,setSelectedLabel] = useState("Countryside")
  
  return (
    <>
      <LabelsScrollerBar selectedLabel={selectedLabel} onLabelSelect={(label) => {
          console.log(label.name)
          setSelectedLabel(label)
          }} />
      <section className="app-header">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
          doloremque nemo distinctio vel aperiam explicabo facilis, atque rerum
          illum est in voluptates sapiente sequi id! Minus nisi debitis nesciunt
          expedita.
        </p>
      </section>
    </>
  );
}
