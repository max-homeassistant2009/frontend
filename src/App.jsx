import { useState } from 'react'
import Button from './Button'
import { Card, Slider } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{margin: 0, padding: 0}}>
        <Card variant="outlined" sx={{m: '100px', p: '100px', border: '3px solid', borderRadius: '25px',}}>Test</Card>
    </div>
  )
}

export default App
