import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//styles
import './Searchbar.css'

export default function Searchbar() {
    const [term, setTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate(`/search?q=${term}`)
    }

    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">
                    <input
                        type="text"
                        id="search"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Search for recipes..."
                        required
                    />
                </label>
            </form>
        </div>
    )
}
