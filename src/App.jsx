import { useState } from 'react'
import Button from './Button'
import { Card, Slider } from '@mui/material'
import testData from './data'

function App() {
  return (
    <div style={{margin: 0, padding: 0}}>
        <Card variant="outlined" sx={{m: '100px', p: '30px', border: '3px solid', borderRadius: '25px',}}>
            <h1>Unsere Gruppe</h1>
            <ul style={{listStyleType: 'none', padding: 0}}>
                {testData.map(person => (
                    <li key={person.id}>{person.id}. {person.name}</li>
                ))}
            </ul>
        </Card>
    </div>
  )
}

export default App
